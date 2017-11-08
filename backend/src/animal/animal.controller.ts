import {Controller, Get, Post, Put, Delete, Patch, Body, UseGuards, UseInterceptors, Param, Res, Query, Inject} from '@nestjs/common';
import { AnimalService } from './animal.service';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { LoggingInterceptor } from '../common/interceptors/logging.interceptor';
import { TransformInterceptor } from '../common/interceptors/transform.interceptor';
import { ParseIntPipe } from '../common/pipes/parse-int.pipe';
import {Animal} from './animal.entity';
import {FindManyOptions} from 'typeorm';
import {DeepPartial} from 'typeorm/common/DeepPartial';

@Controller('animals')
@UseGuards(RolesGuard)
@UseInterceptors(LoggingInterceptor, TransformInterceptor)
export class AnimalController {
  constructor(
    private readonly animalService: AnimalService
  ) {}

  @Post()
  // @Roles('admin')
  async create(@Body() requestBody: Animal, @Res() res) {

    this.animalService.create(requestBody)
      .then(data => {
        res.status(200).send({
          message: 'Success',
          status: res.status,
          data: data
        });
      })
      .catch(err => {
        if (err.message === 'Animal already exists') {
          res.statusMessage = err.message;
          res.status(403).send();
        } else {
          res.statusMessage = err.message;
          res.status(500).send(err.message);
        }
      });
  }

  @Get()
  async find(options?: FindManyOptions<Animal>): Promise<Animal[]> {
    const defaultOptions = {
      take: 100,
      skip: 0
    };
    return this.animalService.find(options || defaultOptions);
  }

  @Get(':id')
  findOne(@Param('id', new ParseIntPipe()) id): Promise<Animal> {
    return this.animalService.findOneById(id);
  }

  @Put()
  // TODO: Only animal can update himself or maybe admin
  async fullUpdate(animal: Animal) {
    return this.animalService.update(animal.id, animal);
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
