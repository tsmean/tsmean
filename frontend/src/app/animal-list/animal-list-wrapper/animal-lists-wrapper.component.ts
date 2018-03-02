import {Component, OnInit, Input} from '@angular/core';

import {AnimalListService} from '../animal-list.service';
import {AnimalListDashboardListStore} from '../animal-list-dashboard-list.store';
import {AnimalListStoreService} from '../animal-list.store';
import {AnimalList} from '../animal-list.model';

@Component({
  selector: 'app-animal-lists-wrapper',
  templateUrl: './animal-lists-wrapper.component.html',
  styleUrls: ['./animal-lists-wrapper.component.css']
})
export class AnimalListWrapperComponent implements OnInit {
  listIds: number[] = [];

  constructor(
    private animalListService: AnimalListService,
    private dashboardLists: AnimalListDashboardListStore,
    private animalListsStore: AnimalListStoreService
  ) {}

  ngOnInit() {
    // get animals and initialize dashboard list
    this.subscribeToAnimalsList();
  }

  private subscribeToAnimalsList() {
    this.animalListService.getAnimalLists().subscribe(
      lists => {
        this.animalListsStore.addOrUpdateMany(lists);
        this.dashboardLists.set(lists.map(list => list.id));
      },
      errorResp => {
        console.error('something went wrong when getting animal lists:', errorResp);
      }
    );

    // set up listener
    this.dashboardLists.get().subscribe(newList => {
      this.listIds = newList;
    });
  }
}
