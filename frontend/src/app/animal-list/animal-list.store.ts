import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

import {AnimalList} from './animal-list.model';
import {ResourceStoreService} from '../resource/resource.store';

@Injectable()
export class AnimalListStoreService {
  constructor(private resourceStore: ResourceStoreService) {}

  private get resourceName() {
    return 'animal-lists';
  }

  addOrUpdate(animal: AnimalList): void {
    this.resourceStore.addOrUpdate(this.resourceName, animal);
  }

  addOrUpdateMany(animals: AnimalList[]): void {
    this.resourceStore.addOrUpdateMany(this.resourceName, animals);
  }

  remove(resourceId: number): void {
    this.resourceStore.remove(this.resourceName, resourceId);
  }

  get(resourceId: number): BehaviorSubject<AnimalList> {
    return this.resourceStore.get(this.resourceName, resourceId);
  }
}
