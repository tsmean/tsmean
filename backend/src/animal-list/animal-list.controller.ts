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
  BadRequestException
} from '@nestjs/common';
import {FindManyOptions} from 'typeorm';
import {DeepPartial} from 'typeorm/common/DeepPartial';

import {AnimalListService} from './animal-list.service';
import {LoggingInterceptor} from '../common/interceptors/logging.interceptor';
import {TransformInterceptor} from '../common/interceptors/transform.interceptor';
import {Animal} from '../animal/animal.entity';
import {apiPath} from '../api';
import {AnimalListDto} from '../../../shared/src/dto/animal-list/animal-list.dto';
import {AnimalList} from './animal-list.entity';
import {User} from '../user/user.entity';
import {CurrentUser} from '../user/user.decorator';
import {Authorized} from '../common/decorators/authorized.decorator';

@Controller(apiPath(1, 'animal-lists'))
@UseInterceptors(LoggingInterceptor, TransformInterceptor)
export class AnimalListController {
  constructor(private readonly animalListService: AnimalListService) {}

  @Post()
  @Authorized()
  async create(@Body() createDto: AnimalListDto, @CurrentUser() currentUser?: User) {
    try {
      return await this.animalListService.create(createDto, currentUser);
    } catch (err) {
      // if (err.message === 'Animal already exists') {
      //   throw new BadRequestException(err.message);
      // } else {
      throw new InternalServerErrorException(err.message);
      // }
    }
  }

  @Get()
  async find(@Query() findOptions?: FindManyOptions<AnimalList>, @CurrentUser() currentUser?: User): Promise<AnimalList[]> {
    const options = {
      skip: 0,
      take: 100,
      ...findOptions // overwrite default ones
    };
    return this.animalListService.find(options, currentUser);
  }

  @Get(':id')
  async findOne(
    @Param('id', new ParseIntPipe())
    id: number,
    @CurrentUser() currentUser?: User
  ): Promise<AnimalList> {
    const animalList = await this.animalListService.findOneById(id);

    if (animalList.owner && (!currentUser || animalList.owner.id !== currentUser.id)) {
      throw new ForbiddenException('Access denied!');
    }
    return animalList;
  }

  @Put()
  async fullUpdate(@Body() requestBody: AnimalListDto) {
    return await this.animalListService.update(requestBody.id, requestBody);
  }

  @Patch(':id')
  @Authorized()
  async partialUpdate(
    @Param('id', new ParseIntPipe())
    id: number,
    @Body() partialEntry: DeepPartial<Animal>
  ) {
    return this.animalListService.update(id, partialEntry);
  }

  @Delete(':id')
  @Authorized()
  async remove(
    @Param('id', new ParseIntPipe())
    id: number
  ) {
    return this.animalListService.remove(id);
  }
}
