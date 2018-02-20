import {Component, OnInit} from '@angular/core';
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
  animalIds: number[] = [];

  constructor(
    private animalService: AnimalService,
    private dashboardList: AnimalDashboardListStore,
    private animalStore: AnimalStoreService
  ) {}

  ngOnInit() {
    // get animals and initialize dashboard list
    this.animalService.getAnimals().subscribe(
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
