import {Component, OnInit} from '@angular/core';

import {AnimalListService} from '../animal-list.service';
import {AnimalListDashboardListStore} from '../animal-list-dashboard-list.store';
import {AnimalListStoreService} from '../animal-list.store';
import {AnimalList} from '../animal-list.model';

@Component({
  selector: 'app-animal-lists-wrapper',
  templateUrl: './animal-lists-wrapper.component.html',
  styleUrls: ['./animal-lists-wrapper.component.scss']
})
export class AnimalListWrapperComponent implements OnInit {
  listIds: number[] = [];
  private publicListId: number;

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
        const publicList = lists.find(list => list.owner === undefined) as AnimalList;
        this.publicListId = publicList.id;
        const usersLists = lists.filter(list => list.owner !== undefined).sort((a, b) => b.id - a.id);
        const animalsLists = [publicList].concat(usersLists);
        const listIds = animalsLists.map(list => list.id);
        this.animalListsStore.addOrUpdateMany(animalsLists);
        this.dashboardLists.set(listIds);
      },
      errorResp => {
        console.error('something went wrong when getting animal lists:', errorResp);
      }
    );

    // set up listener
    this.dashboardLists.get().subscribe(newListIds => {
      const usersListsIds = newListIds.filter(listId => listId !== this.publicListId).sort((a, b) => b - a);
      this.listIds = [this.publicListId].concat(usersListsIds);
    });
  }
}
