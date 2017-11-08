import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { Animal } from './animal';


import { ResourceService } from '@tsmean/resource/resource.service';
import {Http} from '@angular/http';
import {AnimalStoreService} from './animal.store';

@Injectable()
export class AnimalService {

  constructor(
      private resourceService: ResourceService,
      private http: Http,
      private animalStoreService: AnimalStoreService
  ) { }

  private get resourceName (): string {
    return 'animals';
  }

  getAnimals(): Observable<Animal[]> {
    return this.resourceService.getResources(this.resourceName);
  }

  createAnimal(animal: Animal): Observable<Animal> {
    const animalObs = this.resourceService.createResource(animal, this.resourceName);
    return animalObs;
  }

  deleteAnimal(animalId: string): Observable<Animal> {
    return this.resourceService.deleteResource(animalId, this.resourceName);
  }

  updateAnimal(animal: Animal): Observable<Animal> {
    return this.resourceService.updateResource(animal, this.resourceName);
  }

  // small extra: add a picture to the animal
  // works with observable to achieve best user experience
  addAnimalPic (animalName, animalObs) {
    const animalImageObs = this.http.get(`http://animals.tsmean.com/find?q=${animalName.toLowerCase()}`);
    animalObs.subscribe(animalResp => {
      animalImageObs.subscribe(animal => {
        animalResp.pic = animal.json().urlEncodedPath;
        this.updateAnimal(animalResp).subscribe(updatedAnimal => {
          this.animalStoreService.addOrUpdate(updatedAnimal);
        });
      });
    });
  };

}
