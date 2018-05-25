import {Component, Input, OnInit} from '@angular/core';

import {Animal} from '../animal.model';
import {AnimalService} from '../animal.service';
import {AnimalDashboardListStore} from '../animal-dashboard-list.store';
import {AnimalStoreService} from '../animal.store';

@Component({
  selector: 'app-animal-delete',
  templateUrl: './delete-animal.component.html',
  styleUrls: ['./delete-animal.component.scss']
})
export class DeleteAnimalComponent implements OnInit {
  @Input() animal: Animal;
  @Input() listId: number;

  constructor(
    private animalService: AnimalService,
    private dashboardList: AnimalDashboardListStore,
    private animalStore: AnimalStoreService
  ) {}

  ngOnInit() {}

  public deleteAnimal() {
    this.animalService.deleteAnimal(this.animal.id, this.listId).subscribe(() => {
      this.animalStore.remove(this.animal.id);
      this.dashboardList.removeById(this.animal.id);
    });
  }
}
