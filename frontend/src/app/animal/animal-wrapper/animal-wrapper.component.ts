import {Component, OnInit, Input} from '@angular/core';

import {AnimalService} from '../animal.service';
import {AnimalDashboardListStore} from '../animal-dashboard-list.store';
import {AnimalStoreService} from '../animal.store';
import {Animal} from '../animal.model';
import {Subscription} from 'rxjs/Subscription';
import {AnimalListDashboardListStore} from '../../animal-list/animal-list-dashboard-list.store';

@Component({
  selector: 'app-animal-wrapper',
  templateUrl: './animal-wrapper.component.html',
  styleUrls: ['./animal-wrapper.component.css']
})
export class AnimalWrapperComponent implements OnInit {
  private currentListId = 1;
  private animalsSubscription: Subscription;
  animalIds: number[] = [];

  constructor(
    private animalService: AnimalService,
    private dashboardAnimals: AnimalDashboardListStore,
    private dashboardLists: AnimalListDashboardListStore,
    private animalStore: AnimalStoreService
  ) {}

  ngOnInit() {
    // get animals and initialize dashboard list
    this.subscribeToCurrentList();
  }

  private subscribeToCurrentList() {
    this.dashboardLists.getCurrent().subscribe(currentListId => {
      console.log('subscribeToCurrentList', currentListId);
      this.currentListId = currentListId;
      this.reSubscribeToAnimals();
    });
  }

  private reSubscribeToAnimals() {
    if (this.animalsSubscription) {
      this.animalsSubscription.unsubscribe();
    }
    this.animalsSubscription = this.animalService.getAnimals(this.currentListId).subscribe(
      animals => {
        this.animalStore.addOrUpdateMany(animals);
        this.dashboardAnimals.set(animals.map(animal => animal.id));
      },
      errorResp => {
        console.error('something went wrong when getting animals:', errorResp);
      }
    );

    // set up listener
    this.dashboardAnimals.get().subscribe(newList => {
      this.animalIds = newList;
    });
  }
}
