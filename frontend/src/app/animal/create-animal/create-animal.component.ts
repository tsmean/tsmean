import {Component, Input, OnInit} from '@angular/core';
import {NotifyService} from '@tsmean/toast';
import {AnimalWithoutId} from '../animal.model';
import {AnimalService} from '../animal.service';
import {AnimalDashboardListStore} from '../animal-dashboard-list.store';
import {AnimalStoreService} from '../animal.store';

@Component({
  selector: 'app-animal-create',
  templateUrl: './create-animal.component.html',
  styleUrls: ['./create-animal.component.scss']
})
export class CreateAnimalComponent implements OnInit {
  public newAnimal: AnimalWithoutId;

  @Input() listId: number;
  isCreatingAnimal = false;

  constructor(private animalService: AnimalService,
              private notifyService: NotifyService,
              private dashboardList: AnimalDashboardListStore,
              private animalStoreService: AnimalStoreService) {
  }

  ngOnInit() {
    this.resetInput();
  }

  private resetInput() {
    this.newAnimal = {};
  }

  public createAnimal() {
    this.isCreatingAnimal = true;
    const animalObs = this.animalService.createAnimal(this.newAnimal, this.listId);
    animalObs.subscribe(
      newAnimal => {
        this.animalStoreService.addOrUpdate(newAnimal);
        this.notifyService.success('Animal Created');
        this.dashboardList.add(newAnimal.id);
      },
      errorResp => {
        this.notifyService.error(errorResp.statusText);
      },
      () => {
        this.isCreatingAnimal = false;
      }
    );
    if (this.newAnimal.name) {
      this.animalService.addAnimalPic(this.newAnimal.name, animalObs, this.listId);
    }
    this.resetInput();
  }

  createAnimalOnEnter(e: KeyboardEvent) {
    if (e.which === 13 || e.keyCode === 13) {
      this.createAnimal();
    }
  }

}
