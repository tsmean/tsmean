import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';

import {Animal} from '../animal.model';
import {AnimalSettings} from '../animal-settings';
import {AnimalService} from '../animal.service';
import {AnimalStoreService} from '../animal.store';
import {ResourceStoreService} from '../../resource/resource.store';

@Component({
  selector: 'app-animal-display',
  templateUrl: './display-animal.component.html',
  styleUrls: ['./display-animal.component.scss']
})
export class DisplayAnimalComponent implements OnChanges {
  @Input() animalId: number;
  @Input() listId: number;

  animal: Animal;

  animalCopy: Animal;

  animalSettings: AnimalSettings = {
    isBeingEdited: false
  };

  constructor(private resourceStore: ResourceStoreService, private animalService: AnimalService, private animalStore: AnimalStoreService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['animalId']) {
      this.animalStore.get(this.animalId).subscribe(animal => {
        this.animal = animal;
        this.resetCopy();
      });
    }
  }

  picUrl(picPath: string) {
    return 'https://animals2.tsmean.com/animals?path=' + picPath;
  }

  toggleEditable() {
    this.animalSettings.isBeingEdited = !this.animalSettings.isBeingEdited;
  }

  updateAnimal() {
    const animalObs = this.animalService.updateAnimal(this.animalCopy, this.listId);
    animalObs.subscribe(animal => {
      this.animalStore.addOrUpdate(animal);
      this.toggleEditable();
    });
    if (this.animalCopy.name) {
      this.animalService.addAnimalPic(this.animalCopy.name, animalObs, this.listId);
    }
  }

  resetCopy() {
    if (this.animal) {
      this.animalCopy = JSON.parse(JSON.stringify(this.animal));
    }
  }
}
