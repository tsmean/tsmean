import {Resource, ResourceWithoutId} from '@tsmean/shared';

interface AnimalListFields {
  name?: string;
  owner?: {id: number};
}

export interface AnimalList extends Resource, AnimalListFields {}
export interface AnimalListWithoutId extends ResourceWithoutId, AnimalListFields {}
