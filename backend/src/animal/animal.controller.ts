import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Patch,
  Body,
  UseGuards,
  UseInterceptors,
  Param,
  Res,
  Query,
  Inject,
  ForbiddenException,
  InternalServerErrorException,
  ParseIntPipe
} from '@nestjs/common';
import {FindManyOptions} from 'typeorm';
import {DeepPartial} from 'typeorm/common/DeepPartial';

import {AnimalService} from './animal.service';
import {LoggingInterceptor} from '../common/interceptors/logging.interceptor';
import {TransformInterceptor} from '../common/interceptors/transform.interceptor';
import {Animal} from './animal.entity';
import {apiPath} from '../api';

@Controller(apiPath(1, 'animals'))
@UseInterceptors(LoggingInterceptor, TransformInterceptor)
export class AnimalController {
  constructor(private readonly animalService: AnimalService) {}

  @Post()
  async create(@Body() requestBody: Animal) {
    try {
      return await this.animalService.create(requestBody);
    } catch (err) {
      if (err.message === 'Animal already exists') {
        throw new ForbiddenException(err.message);
      } else {
        throw new InternalServerErrorException(err.message);
      }
    }
  }

  @Get()
  async find(@Query() findOptions?: FindManyOptions<Animal>): Promise<Animal[]> {
    const options = {
      take: 100,
      skip: 0,
      ...findOptions // overwrite default ones
    };
    return this.animalService.find(options);
  }

  @Get(':id')
  findOne(
    @Param('id', new ParseIntPipe())
    id
  ): Promise<Animal> {
    return this.animalService.findOneById(id);
  }

  @Put()
  async fullUpdate(@Body() requestBody: Animal) {
    return await this.animalService.update(requestBody.id, requestBody);
  }

  @Patch(':id')
  async partialUpdate(
    @Param('id', new ParseIntPipe())
    id,
    @Body() partialEntry: DeepPartial<Animal>
  ) {
    return this.animalService.update(id, partialEntry);
  }

  @Delete(':id')
  async remove(
    @Param('id', new ParseIntPipe())
    id
  ) {
    return this.animalService.remove(id);
  }
}
