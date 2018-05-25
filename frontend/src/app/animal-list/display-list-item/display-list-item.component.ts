import {Component, Input, OnInit} from '@angular/core';

import {AnimalList} from '../animal-list.model';
import {ListSettings} from '../list-settings';
import {AnimalListService} from '../animal-list.service';
import {AnimalListStoreService} from '../animal-list.store';
import {AnimalListDashboardListStore} from '../animal-list-dashboard-list.store';

@Component({
  selector: 'app-animal-list-display',
  templateUrl: './display-list-item.component.html',
  styleUrls: ['./display-list-item.component.scss']
})
export class DisplayListItemComponent implements OnInit {
  private activeListId: number;
  private _listId: number;
  list: AnimalList;
  listCopy: AnimalList;
  listSettings: ListSettings = {
    isBeingEdited: false
  };

  constructor(
    private animalListService: AnimalListService,
    private animalListStore: AnimalListStoreService,
    private dashboardLists: AnimalListDashboardListStore
  ) {}

  chooseList() {
    this.dashboardLists.setCurrent(this._listId);
  }

  ngOnInit() {
    this.dashboardLists.getCurrent().subscribe(activeListId => {
      this.activeListId = activeListId;
    });
  }

  @Input()
  set listId(listId: number) {
    if (listId) {
      this._listId = listId;
      this.animalListStore.get(listId).subscribe(list => {
        this.list = list;
        this.resetCopy();
      });
    }
  }

  toggleEditable() {
    this.listSettings.isBeingEdited = !this.listSettings.isBeingEdited;
  }

  updateAnimalList() {
    const listObs = this.animalListService.updateAnimalList(this.listCopy);
    listObs.subscribe(list => {
      this.animalListStore.addOrUpdate(list);
      this.toggleEditable();
    });
  }

  resetCopy() {
    if (this.list) {
      this.listCopy = JSON.parse(JSON.stringify(this.list));
    }
  }
}
