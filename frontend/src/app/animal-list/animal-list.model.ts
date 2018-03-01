import {Resource, ResourceWithoutId} from '@tsmean/shared';

export interface AnimalList extends Resource, AnimalListFields {}
export interface AnimalListWithoutId extends ResourceWithoutId, AnimalListFields {}

interface AnimalListFields {
  name?: string;
}
