import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {AnimalList, AnimalListWithoutId} from './animal-list.model';
import {ResourceService} from '../resource/resource.service';

@Injectable()
export class AnimalListService {
  constructor(private resourceService: ResourceService) {}

  private get resourceName(): string {
    return `animal-lists`;
  }

  getAnimalLists(): Observable<AnimalList[]> {
    return this.resourceService.getResources(this.resourceName);
  }

  createAnimalList(animal: AnimalListWithoutId): Observable<AnimalList> {
    return this.resourceService.createResource(animal, this.resourceName);
  }

  deleteAnimalList(animalListId: number): Observable<void> {
    return this.resourceService.deleteResource(animalListId, this.resourceName);
  }

  updateAnimalList(animal: AnimalList): Observable<AnimalList> {
    return this.resourceService.updateResource(animal, this.resourceName);
  }
}
