import {Component, OnInit} from '@angular/core';
import {Animal} from '../animal';
import {AnimalService} from '../animal.service';
import {NotifyService} from 'notify-angular';
import {AnimalDashboardListStore} from '../animal-dashboard-list.store';
import {AnimalStoreService} from '../animal.store';
import {Http} from '@angular/http';
import {WebUtils} from '@tsmean/utils';

@Component({
  selector: 'animal-create',
  templateUrl: './create-animal.component.html',
  styleUrls: ['./create-animal.component.css']
})
export class CreateAnimalComponent implements OnInit {

  public newAnimal: Animal;

  constructor(
      private animalService: AnimalService,
      private notifyService: NotifyService,
      private dashboardList: AnimalDashboardListStore,
      private animalStoreService: AnimalStoreService,
      private http: Http
  ) { }

  ngOnInit() {
    this.newAnimal = {};
  }

  public createAnimal() {
    const animalObs = this.animalService.createAnimal(this.newAnimal);
    animalObs.subscribe(newAnimal => {
      this.animalStoreService.addOrUpdate(newAnimal);
      this.notifyService.success('Animal Created');
      this.dashboardList.add(newAnimal.uid);
    }, errorResp => {
      this.notifyService.error(errorResp.statusText);
    });
    if (this.newAnimal.name) {
      this.animalService.addAnimalPic(this.newAnimal.name, animalObs);
    }
  }

  createAnimalOnEnter(e: KeyboardEvent) {
    if (WebUtils.isEnter(e)) {
      this.createAnimal();
    }
  }

}
