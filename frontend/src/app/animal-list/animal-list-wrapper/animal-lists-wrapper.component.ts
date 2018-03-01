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
  private _listId = 2;
  listIds: number[] = [];

  @Input()
  set listId(id: number) {
    console.log('listId', id);
    this._listId = id;
    this.subscribeToAnimalsList();
  }

  constructor(
    private animalListService: AnimalListService,
    private dashboardList: AnimalListDashboardListStore,
    private animalListsStore: AnimalListStoreService
  ) {}

  ngOnInit() {
    // get animals and initialize dashboard list
    this.subscribeToAnimalsList();
  }

  private subscribeToAnimalsList() {
    this.animalListService.getAnimalLists(this._listId).subscribe(
      lists => {
        this.animalListsStore.addOrUpdateMany(lists);
        this.dashboardList.set(lists.map(list => list.id));
      },
      errorResp => {
        console.error('something went wrong when getting animal lists:', errorResp);
      }
    );

    // set up listener
    this.dashboardList.get().subscribe(newList => {
      this.listIds = newList;
    });
  }
}
