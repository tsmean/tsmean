import {InjectionToken, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ResourceService} from './resource.service';
import {Http, HttpModule} from '@angular/http';
import {ResourceStoreService} from './resource.store';
import {ApiUrl} from './api-url-injection-token';

@NgModule({
  imports: [
    CommonModule,
    HttpModule
  ],
  declarations: []
})
export class ResourceModule {
  static forRoot(apiUrl: string) {
    return {
      ngModule: ResourceModule,
      providers: [
        { provide: ApiUrl, useValue: apiUrl },
        ResourceService,
        ResourceStoreService
      ]
    };
  }
}
