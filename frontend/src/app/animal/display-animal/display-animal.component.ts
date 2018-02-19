import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Animal} from '../animal.model';
import {AnimalSettings} from '../animal-settings';
import {AnimalService} from '../animal.service';

import {CoreUtils} from '@tsmean/utils';
import {AnimalStoreService} from '../animal.store';
import {ResourceStoreService} from '../../resource/resource.store';

@Component({
  selector: 'app-animal-display',
  templateUrl: './display-animal.component.html',
  styleUrls: ['./display-animal.component.css']
})
export class DisplayAnimalComponent implements OnChanges {

  @Input()
  animalId: number;

  animal: Animal;

  animalCopy: Animal;

  animalSettings: AnimalSettings = {
    isBeingEdited: false
  };

  constructor(
    private resourceStore: ResourceStoreService,
      private animalService: AnimalService,
      private animalStore: AnimalStoreService
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['animalId']) {
      this.animalStore.get(this.animalId).subscribe(animal => {
        this.animal = animal;
        this.resetCopy();
      });
    }
  }

  picUrl(picPath: string) {
    return 'https://animal-images.herokuapp.com/animals?path=' + picPath;
  }


  toggleEditable() {
    this.animalSettings.isBeingEdited = !this.animalSettings.isBeingEdited;
  }

  updateAnimal() {
    const animalObs = this.animalService.updateAnimal(this.animalCopy);
    animalObs.subscribe(animal => {
      this.animalStore.addOrUpdate(animal);
      this.toggleEditable();
    });
    if (this.animalCopy.name) {
      this.animalService.addAnimalPic(this.animalCopy.name, animalObs);
    }
  }

  resetCopy() {
    if (this.animal) {
      this.animalCopy = CoreUtils.deepCopy(this.animal);
    }
  }

}
