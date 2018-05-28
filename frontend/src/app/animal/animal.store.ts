import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

import {Animal} from './animal.model';
import {ResourceStoreService} from '../resource/resource.store';

@Injectable()
export class AnimalStoreService {
  constructor(private resourceStore: ResourceStoreService) {}

  private get resourceName() {
    return 'animals';
  }

  addOrUpdate(animal: Animal): void {
    this.resourceStore.addOrUpdate(this.resourceName, animal);
  }

  addOrUpdateMany(animals: Animal[]): void {
    this.resourceStore.addOrUpdateMany(this.resourceName, animals);
  }

  remove(resourceId: number): void {
    this.resourceStore.remove(this.resourceName, resourceId);
  }

  get(resourceId: number): BehaviorSubject<Animal> {
    return this.resourceStore.get(this.resourceName, resourceId);
  }
}
