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
  ParseIntPipe,
} from '@nestjs/common';
import { AnimalService } from './animal.service';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { LoggingInterceptor } from '../common/interceptors/logging.interceptor';
import { TransformInterceptor } from '../common/interceptors/transform.interceptor';
import {Animal} from './animal.entity';
import {FindManyOptions} from 'typeorm';
import {DeepPartial} from 'typeorm/common/DeepPartial';
import {apiPath} from '../api';

@Controller(apiPath(1, 'animals'))
@UseGuards(RolesGuard)
@UseInterceptors(LoggingInterceptor, TransformInterceptor)
export class AnimalController {
  constructor(
    private readonly animalService: AnimalService
  ) {}

  @Post()
  // @Roles('admin')
  async create(@Body() requestBody: Animal) {
    try {
      const data = await this.animalService.create(requestBody);
      return {
        message: 'Success',
        status: 200,
        data: data
      };
    } catch (err) {
      if (err.message === 'Animal already exists') {
        throw new ForbiddenException(err.message);
      } else {
        throw new InternalServerErrorException(err.message);
      }
    }
  }

  @Get()
  async find(findOptions?: FindManyOptions<Animal>): Promise<Animal[]> {
    const options = {
      take: 100,
      skip: 0,
      ...findOptions, // overwrite default ones
    }
    return this.animalService.find(options);
  }

  @Get(':id')
  findOne(@Param('id', new ParseIntPipe()) id): Promise<Animal> {
    return this.animalService.findOneById(id);
  }

  @Put()
  // TODO: Only animal can update himself or maybe admin
  async fullUpdate(@Body() requestBody: Animal) {
    const data = await this.animalService.update(requestBody.id, requestBody);
    return {
      message: 'Success',
      status: 200,
      data: data
    };
  }

  @Patch(':id')
  async partialUpdate(@Param('id', new ParseIntPipe()) id, partialEntry: DeepPartial<Animal>) {
    return this.animalService.update(id, partialEntry);
  }

  @Delete(':id')
  // TODO: Only animal can delete himself or maybe admin
  async remove(@Param('id', new ParseIntPipe()) id) {
    return this.animalService.remove(id);
  }

}
