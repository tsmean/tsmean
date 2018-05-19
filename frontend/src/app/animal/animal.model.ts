import {Resource, ResourceWithoutId} from '@tsmean/shared';

export interface Animal extends Resource, AnimalFields {
}

export interface AnimalWithoutId extends ResourceWithoutId, AnimalFields {
}

interface AnimalFields {
  name?: string;
  pic?: string;
}
