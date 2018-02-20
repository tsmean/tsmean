import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Animal, AnimalWithoutId} from './animal.model';

import {Http} from '@angular/http';
import {AnimalStoreService} from './animal.store';
import {ResourceService} from '../resource/resource.service';

@Injectable()
export class AnimalService {
  constructor(private resourceService: ResourceService, private http: Http, private animalStoreService: AnimalStoreService) {}

  private get resourceName(): string {
    return 'animals';
  }

  getAnimals(): Observable<Animal[]> {
    return this.resourceService.getResources(this.resourceName);
  }

  createAnimal(animal: AnimalWithoutId): Observable<Animal> {
    const animalObs = this.resourceService.createResource(animal, this.resourceName);
    return animalObs;
  }

  deleteAnimal(animalId: number): Observable<void> {
    return this.resourceService.deleteResource(animalId, this.resourceName);
  }

  updateAnimal(animal: Animal): Observable<Animal> {
    return this.resourceService.updateResource(animal, this.resourceName);
  }

  // small extra: add a picture to the animal
  // works with observable to achieve best user experience
  addAnimalPic(animalName: string, animalObs: Observable<Animal>) {
    const animalImageObs = this.http.get(`https://animal-images.herokuapp.com/find?q=${animalName.toLowerCase()}`);
    animalObs.subscribe(animalResp => {
      animalImageObs.subscribe(animal => {
        animalResp.pic = animal.json().urlEncodedPath;
        this.updateAnimal(animalResp).subscribe(updatedAnimal => {
          this.animalStoreService.addOrUpdate(updatedAnimal);
        });
      });
    });
  }
}
