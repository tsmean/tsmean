import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { Animal } from './animal';

import { ResourceStoreService } from '@tsmean/resource/resource.store';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class AnimalStoreService {

  constructor(
      private resourceStore: ResourceStoreService
  ) { }

  private get resourceName() {
    return 'animals';
  }

  addOrUpdate (animal: Animal): void {
    this.resourceStore.addOrUpdate(this.resourceName, animal);
  }

  addOrUpdateMany(animals: Animal[]): void {
    this.resourceStore.addOrUpdateMany(this.resourceName, animals);
  }

  remove (resourceId: string): void {
    this.resourceStore.remove(this.resourceName, resourceId);
  }

  get (resourceId: string): BehaviorSubject<Animal> {
    return this.resourceStore.get(this.resourceName, resourceId);
  }

}
