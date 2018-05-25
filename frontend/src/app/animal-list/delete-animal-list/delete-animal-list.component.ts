import {Component, Input, OnInit} from '@angular/core';

import {AnimalList} from '../animal-list.model';
import {AnimalListService} from '../animal-list.service';
import {AnimalListDashboardListStore} from '../animal-list-dashboard-list.store';
import {AnimalListStoreService} from '../animal-list.store';

@Component({
  selector: 'app-animal-list-delete',
  templateUrl: './delete-animal-list.component.html',
  styleUrls: ['./delete-animal-list.component.scss']
})
export class DeleteAnimalListComponent implements OnInit {
  @Input() list: AnimalList;

  constructor(
    private animalListService: AnimalListService,
    private dashboardLists: AnimalListDashboardListStore,
    private animalListStore: AnimalListStoreService,
  ) {}

  ngOnInit() {}

  public deleteAnimal() {
    this.animalListService.deleteAnimalList(this.list.id).subscribe(() => {
      this.animalListStore.remove(this.list.id);
      this.dashboardLists.removeById(this.list.id);
      this.dashboardLists.setCurrent(1);
    });
  }
}
