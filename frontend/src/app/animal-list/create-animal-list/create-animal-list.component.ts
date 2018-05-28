import {Component, OnInit} from '@angular/core';
import {NotifyService} from '@tsmean/toast';

import {AnimalListWithoutId} from '../animal-list.model';
import {AnimalListService} from '../animal-list.service';
import {AnimalListDashboardListStore} from '../animal-list-dashboard-list.store';
import {AnimalListStoreService} from '../animal-list.store';

@Component({
  selector: 'app-animal-list-create',
  templateUrl: './create-animal-list.component.html',
  styleUrls: ['./create-animal-list.component.scss']
})
export class CreateAnimalListComponent implements OnInit {
  public newList: AnimalListWithoutId;

  constructor(
    private animalListService: AnimalListService,
    private notifyService: NotifyService,
    private dashboardLists: AnimalListDashboardListStore,
    private animalListStoreService: AnimalListStoreService
  ) {}

  ngOnInit() {
    this.resetInput();
  }

  resetInput() {
    this.newList = {};
  }

  createList() {
    const listObs = this.animalListService.createAnimalList(this.newList);
    this.resetInput();
    listObs.subscribe(
      newList => {
        this.animalListStoreService.addOrUpdate(newList);
        this.notifyService.success('List Created');
        this.dashboardLists.add(newList.id);
        this.dashboardLists.setCurrent(newList.id);
      },
      errorResp => {
        this.notifyService.error(errorResp.statusText);
      }
    );
  }

  createListOnEnter(e: KeyboardEvent) {
    const enterKey = 13;
    if (e.which === enterKey || e.keyCode === enterKey) {
      this.createList();
    }
  }
}
