import { Component, OnInit } from '@angular/core';
import {AnimalService} from '../animal.service';
import {AnimalDashboardListStore} from '../animal-dashboard-list.store';
import {AnimalStoreService} from '../animal.store';

@Component({
  selector: 'animal-wrapper',
  templateUrl: './animal-wrapper.component.html',
  styleUrls: ['./animal-wrapper.component.css']
})
export class AnimalWrapperComponent implements OnInit {

  animalIds: string[] = [];

  constructor(
      private animalService: AnimalService,
      private dashboardList: AnimalDashboardListStore,
      private animalStore: AnimalStoreService
  ) {}


  ngOnInit() {

    // get animals and initialize dashboard list
    this.animalService.getAnimals().subscribe(animals => {
      this.animalStore.addOrUpdateMany(animals);
      this.dashboardList.set(animals.map(animal => animal.uid));
    }, errorResp => {
      console.error('something went wrong when getting animals:', errorResp);
    });

    // set up listener
    this.dashboardList.get().subscribe(newList => {
      this.animalIds = newList;
    });

  }


}
