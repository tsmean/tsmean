import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MatInputModule, MatButtonModule, MatCardModule, MatToolbarModule, MatMenuModule, MatIconModule} from '@angular/material';

import {AnimalListService} from './animal-list.service';
import {DisplayAnimalListsComponent} from './display-animal-lists/display-animal-lists.component';
import {DisplayListItemComponent} from './display-list-item/display-list-item.component';
import {AnimalListWrapperComponent} from './animal-list-wrapper/animal-lists-wrapper.component';
import {AnimalListStoreService} from './animal-list.store';
import {AnimalListDashboardListStore} from './animal-list-dashboard-list.store';

@NgModule({
  imports: [CommonModule, FormsModule, MatInputModule, MatButtonModule, MatCardModule, MatToolbarModule, MatMenuModule, MatIconModule],
  declarations: [DisplayAnimalListsComponent, DisplayListItemComponent, AnimalListWrapperComponent],
  exports: [DisplayAnimalListsComponent, DisplayListItemComponent, AnimalListWrapperComponent]
})
export class AnimalListModule {
  static forRoot() {
    return {
      ngModule: AnimalListModule,
      providers: [AnimalListService, AnimalListStoreService, AnimalListDashboardListStore]
    };
  }
}
