import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  InternalServerErrorException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
  UseInterceptors
} from '@nestjs/common';
import {FindManyOptions} from 'typeorm';
import {DeepPartial} from 'typeorm/common/DeepPartial';
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiUseTags} from '@nestjs/swagger';

import {AnimalListService} from './animal-list.service';
import {LoggingInterceptor} from '../common/interceptors/logging.interceptor';
import {TransformInterceptor} from '../common/interceptors/transform.interceptor';
import {Animal} from '../animal/animal.entity';
import {apiPath} from '../api';
import {AnimalListDto} from '@tsmean/shared/src/dto/animal-list/animal-list.dto';
import {AnimalList} from './animal-list.entity';
import {User} from '../user/user.entity';
import {CurrentUser} from '../user/user.decorator';
import {Authorized} from '../common/decorators/authorized.decorator';

@ApiUseTags('Animal lists')
@UseInterceptors(LoggingInterceptor, TransformInterceptor)
@Controller(apiPath(1, 'animal-lists'))
export class AnimalListController {
  constructor(private readonly animalListService: AnimalListService) {}

  @ApiBearerAuth()
  @ApiOperation({title: 'Create animals list'})
  @ApiResponse({
    status: 201,
    description: 'The list has been successfully created.',
    type: AnimalList
  })
  @ApiResponse({status: 401, description: 'You have to be logged to create list!'})
  @Authorized()
  @Post()
  async create(@Body() createDto: AnimalListDto, @CurrentUser() currentUser?: User) {
    try {
      return await this.animalListService.create(createDto, currentUser);
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  @ApiOperation({title: 'Get all animals lists'})
  @ApiResponse({
    status: 200,
    description: 'The all animals lists.',
    type: AnimalList,
    isArray: true
  })
  @Get()
  async find(@Query() findOptions?: FindManyOptions<AnimalList>, @CurrentUser() currentUser?: User): Promise<AnimalList[]> {
    const options = {
      skip: 0,
      take: 100,
      ...findOptions // overwrite default ones
    };
    return this.animalListService.find(options, currentUser);
  }

  @ApiBearerAuth()
  @ApiOperation({title: `Get animals list's details`})
  @ApiResponse({
    status: 200,
    description: 'The list details.',
    type: AnimalList
  })
  @ApiResponse({status: 401, description: 'You have to be logged to get the list!'})
  @ApiResponse({status: 403, description: 'You need to be an owner for the list to get it!'})
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

  @ApiBearerAuth()
  @ApiOperation({title: 'Update animals list details'})
  @ApiResponse({
    status: 200,
    description: 'The list has been successfully updated.',
    type: AnimalList
  })
  @ApiResponse({status: 401, description: 'You have to be logged to update the list!'})
  @ApiResponse({status: 403, description: 'You need to be an owner for the list to update it!'})
  @Authorized()
  @Put()
  async fullUpdate(@Body() requestBody: AnimalListDto, @CurrentUser() currentUser: User) {
    const animalList = await this.animalListService.findOneById(requestBody.id);
    if (!animalList.owner || animalList.owner.id !== currentUser.id) {
      throw new ForbiddenException('Access denied!');
    }
    return await this.animalListService.update(requestBody.id, requestBody);
  }

  @ApiBearerAuth()
  @ApiOperation({title: 'Update animals list details'})
  @ApiResponse({
    status: 200,
    description: 'The list has been successfully updated.',
    type: AnimalList
  })
  @ApiResponse({status: 401, description: 'You have to be logged to update the list!'})
  @ApiResponse({status: 403, description: 'You need to be an owner for the list to update it!'})
  @Authorized()
  @Patch(':id')
  async partialUpdate(
    @Param('id', new ParseIntPipe())
    id: number,
    @Body() partialEntry: DeepPartial<Animal>,
    @CurrentUser() currentUser: User
  ) {
    const animalList = await this.animalListService.findOneById(id);
    if (!animalList.owner || animalList.owner.id !== currentUser.id) {
      throw new ForbiddenException('Access denied!');
    }
    return this.animalListService.update(id, partialEntry);
  }

  @ApiBearerAuth()
  @ApiOperation({title: 'Delete animals list'})
  @ApiResponse({
    status: 204,
    description: 'The list has been successfully deleted.'
  })
  @ApiResponse({status: 401, description: 'You have to be logged to delete the list!'})
  @ApiResponse({status: 403, description: 'You need to be an owner for the list to delete it!'})
  @Authorized()
  @Delete(':id')
  async remove(
    @Param('id', new ParseIntPipe())
    id: number,
    @CurrentUser() currentUser: User
  ) {
    const animalList = await this.animalListService.findOneById(id);
    if (!animalList.owner || animalList.owner.id !== currentUser.id) {
      throw new ForbiddenException('Access denied!');
    }
    return this.animalListService.remove(animalList.id);
  }
}
