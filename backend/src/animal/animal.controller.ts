import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
  UseInterceptors
} from '@nestjs/common';
import {ApiUseTags} from '@nestjs/swagger';
import {FindManyOptions} from 'typeorm';
import {DeepPartial} from 'typeorm/common/DeepPartial';

import {AnimalService} from './animal.service';
import {LoggingInterceptor} from '../common/interceptors/logging.interceptor';
import {TransformInterceptor} from '../common/interceptors/transform.interceptor';
import {Animal} from './animal.entity';
import {apiPath} from '../api';
import {AnimalListService} from '../animal-list/animal-list.service';
import {CurrentUser} from '../user/user.decorator';
import {User} from '../user/user.entity';
import {AnimalDto} from '../../../shared/src/dto/animal/animal.dto';

@ApiUseTags('Animals')
@Controller(apiPath(1, 'animal-lists/:listId/animals'))
@UseInterceptors(LoggingInterceptor, TransformInterceptor)
export class AnimalController {
  constructor(private readonly animalService: AnimalService, private readonly animalListService: AnimalListService) {}

  @Post()
  async create(
    @Param('listId', new ParseIntPipe())
    listId: number,
    @Body() requestBody: AnimalDto,
    @CurrentUser() currentUser?: User
  ) {
    const animalsList = await this.getAnimalsList(listId, currentUser);

    return await this.animalService.create({
      name: requestBody.name,
      list: animalsList
    });
  }

  @Get()
  async find(
    @Param('listId', new ParseIntPipe())
    listId: number,
    @CurrentUser() currentUser?: User,
    @Query() findOptions?: FindManyOptions<Animal>
  ): Promise<Animal[]> {
    const options = {
      take: 100,
      skip: 0,
      ...findOptions // overwrite default ones
    };
    await this.getAnimalsList(listId, currentUser);
    return this.animalService.find(listId, options);
  }

  @Get(':id')
  async findOne(
    @Param('listId', new ParseIntPipe())
    listId: number,
    @Param('id', new ParseIntPipe())
    id: number,
    @CurrentUser() currentUser?: User
  ): Promise<Animal> {
    await this.getAnimalsList(listId, currentUser);
    try {
      return await this.animalService.findOneById(id, listId);
    } catch {
      throw new ForbiddenException('Access denied!');
    }
  }

  @Put()
  async fullUpdate(
    @Param('listId', new ParseIntPipe())
    listId: number,
    @Body() requestBody: Animal,
    @CurrentUser() currentUser?: User
  ) {
    await this.getAnimalsList(listId, currentUser);
    try {
      return await this.animalService.update(requestBody.id, requestBody, listId);
    } catch {
      throw new ForbiddenException('Access denied!');
    }
  }

  @Patch(':id')
  async partialUpdate(
    @Param('id', new ParseIntPipe())
    id: number,
    @Body() partialEntry: DeepPartial<Animal>,
    @Param('listId', new ParseIntPipe())
    listId: number,
    @CurrentUser() currentUser?: User
  ) {
    await this.getAnimalsList(listId, currentUser);
    try {
      return await this.animalService.update(id, partialEntry, listId);
    } catch {
      throw new ForbiddenException('Access denied!');
    }
  }

  @Delete(':id')
  async remove(
    @Param('id', new ParseIntPipe())
    id: number,
    @Param('listId', new ParseIntPipe())
    listId: number,
    @CurrentUser() currentUser?: User
  ) {
    await this.getAnimalsList(listId, currentUser);
    return this.animalService.remove(id);
  }

  private async getAnimalsList(listId: number, currentUser?: User) {
    const animalList = await this.animalListService.findOneById(listId);
    if (!animalList) {
      throw new NotFoundException('Animal list not found');
    }
    if (animalList.owner && (!currentUser || animalList.owner.id !== currentUser.id)) {
      throw new ForbiddenException('Access denied!');
    }
    return animalList;
  }
}
