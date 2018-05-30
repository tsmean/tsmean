import {ResourceWithoutId} from '../../models/resource.model';

export class AnimalListDto implements ResourceWithoutId {
  id?: number;
  name: string;
}
