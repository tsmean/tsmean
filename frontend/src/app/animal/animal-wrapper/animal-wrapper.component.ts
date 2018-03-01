import {Component, OnInit, Input} from '@angular/core';

import {AnimalService} from '../animal.service';
import {AnimalDashboardListStore} from '../animal-dashboard-list.store';
import {AnimalStoreService} from '../animal.store';
import {Animal} from '../animal.model';

@Component({
  selector: 'app-animal-wrapper',
  templateUrl: './animal-wrapper.component.html',
  styleUrls: ['./animal-wrapper.component.css']
})
export class AnimalWrapperComponent implements OnInit {
  private _listId = 2;
  animalIds: number[] = [];

  @Input()
  set listId(id: number) {
    console.log('listId', id);
    this._listId = id;
    this.subscribeToAnimalsList();
  }

  constructor(
    private animalService: AnimalService,
    private dashboardList: AnimalDashboardListStore,
    private animalStore: AnimalStoreService
  ) {}

  ngOnInit() {
    // get animals and initialize dashboard list
    this.subscribeToAnimalsList();
  }

  private subscribeToAnimalsList() {
    this.animalService.getAnimals(this._listId).subscribe(
      animals => {
        this.animalStore.addOrUpdateMany(animals);
        this.dashboardList.set(animals.map(animal => animal.id));
      },
      errorResp => {
        console.error('something went wrong when getting animals:', errorResp);
      }
    );

    // set up listener
    this.dashboardList.get().subscribe(newList => {
      this.animalIds = newList;
    });
  }
}
