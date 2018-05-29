// import {ApiModelProperty, ApiModelPropertyOptional} from '@nestjs/swagger';

import {ResourceWithoutId} from '../../models/resource.model';

export class AnimalListDto implements ResourceWithoutId {
  // @ApiModelPropertyOptional()
  id?: number;

  // @ApiModelProperty({description: 'The name of the animals list'})
  name: string;
}
