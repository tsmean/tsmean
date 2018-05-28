import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {Animal, AnimalWithoutId} from './animal.model';
import {AnimalStoreService} from './animal.store';
import {ResourceService} from '../resource/resource.service';

@Injectable()
export class AnimalService {
  constructor(private resourceService: ResourceService, private http: HttpClient, private animalStoreService: AnimalStoreService) {}

  private getResourceName(listId: number = -999): string {
    return `animal-lists/${listId}/animals`;
  }

  getAnimals(listId: number): Observable<Animal[]> {
    return this.resourceService.getResources(this.getResourceName(listId));
  }

  createAnimal(animal: AnimalWithoutId, listId: number): Observable<Animal> {
    const animalObs = this.resourceService.createResource(animal, this.getResourceName(listId));
    return animalObs;
  }

  deleteAnimal(animalId: number, listId: number): Observable<void> {
    return this.resourceService.deleteResource(animalId, this.getResourceName(listId));
  }

  updateAnimal(animal: Animal, listId: number): Observable<Animal> {
    return this.resourceService.updateResource(animal, this.getResourceName(listId));
  }

  // small extra: add a picture to the animal
  // works with observable to achieve best user experience
  addAnimalPic(animalName: string, animalObs: Observable<Animal>, listId: number) {
    const animalImageObs = this.http.get(`https://animals2.tsmean.com/find?q=${animalName.toLowerCase()}`);
    animalObs.subscribe(animalResp => {
      animalImageObs.subscribe((animal: any) => {
        animalResp.pic = animal.urlEncodedPath;
        this.updateAnimal(animalResp, listId).subscribe(updatedAnimal => {
          this.animalStoreService.addOrUpdate(updatedAnimal);
        });
      });
    });
  }
}
