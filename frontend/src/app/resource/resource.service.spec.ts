import {inject, TestBed} from '@angular/core/testing';
import {HttpClientModule} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

import {ResourceService} from './resource.service';
import {ApiUrl} from './api-url-injection-token';
import {Resource, ResourceWithoutId} from '@tsmean/shared';

interface Hero extends Resource {
  name: string;
}

interface HeroWithoutId extends ResourceWithoutId {
  name: string;
}

describe('ResourceService', () => {
  const apiUrl = 'http://localhost:1234/api/v1/';
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{provide: ApiUrl, useValue: apiUrl}, ResourceService],
      imports: [HttpClientModule, HttpClientTestingModule]
    });
  });

  it(
    'should be able to create the service',
    inject([ResourceService, HttpTestingController], (resourceService: ResourceService, mockBackend: HttpTestingController) => {
      expect(resourceService).toBeTruthy();
    })
  );

  it(
    'should be able to get a list of resources',
    inject([ResourceService, HttpTestingController], (resourceService: ResourceService, mockBackend: HttpTestingController) => {
      const mockResponse = {
        data: [{id: 0, name: 'Wolverine'}, {id: 1, name: 'Wonder Woman'}]
      };

      // TODO: figure out correct url match
      // mockBackend.expectOne(resourceService.resourcesUrl('heroes')).flush(mockResponse);

      resourceService.getResources('heroes').subscribe((heroes: Hero[]) => {
        expect(heroes.length).toBe(2);
        expect(heroes[0].name).toEqual('Wolverine');
        expect(heroes[1].name).toEqual('Wonder Woman');
      });
    })
  );

  it(
    'should be able to get a single resource',
    inject([ResourceService, HttpTestingController], (resourceService: ResourceService, mockBackend: HttpTestingController) => {
      const mockResponse = {
        data: {id: 0, name: 'Wolverine'}
      };

      // TODO: figure out correct url match
      // mockBackend.expectOne(resourceService.resourcesUrl('heroes')).flush(mockResponse);

      resourceService.getResource(0, 'heroes').subscribe((hero: Hero) => {
        expect(hero.id).toBe(0);
        expect(hero.name).toBe('Wolverine');
      });
    })
  );

  it(
    'should be able to create a resource',
    inject([ResourceService, HttpTestingController], (resourceService: ResourceService, mockBackend: HttpTestingController) => {
      const mockResponse = {
        data: {id: 0, name: 'Wolverine'}
      };

      // TODO: figure out correct url match
      // mockBackend.expectOne(resourceService.resourcesUrl('heroes')).flush(mockResponse);

      resourceService
        .createResource(
          <HeroWithoutId>{
            name: 'Wolverine'
          },
          'heroes'
        )
        .subscribe((hero: Hero) => {
          expect(hero.id).toBe(0);
          expect(hero.name).toBe('Wolverine');
        });
    })
  );

  it(
    'should be able to update a resource',
    inject([ResourceService, HttpTestingController], (resourceService: ResourceService, mockBackend: HttpTestingController) => {
      const mockResponse = {
        data: {id: 0, name: 'Stella'}
      };

      // TODO: figure out correct url match
      // mockBackend.expectOne(resourceService.resourcesUrl('heroes')).flush(mockResponse);

      resourceService
        .updateResource(
          <Hero>{
            name: 'Stella',
            id: 0
          },
          'heroes'
        )
        .subscribe((hero: Hero) => {
          expect(hero.id).toBe(0);
          expect(hero.name).toBe('Stella');
        });
    })
  );

  it(
    'should be able to delete a resource',
    inject([ResourceService, HttpTestingController], (resourceService: ResourceService, mockBackend: HttpTestingController) => {
      const mockResponse = {
        data: {id: 0, name: 'Wolverine'}
      };

      // TODO: figure out correct url match
      // mockBackend.expectOne(resourceService.resourcesUrl('heroes')).flush(mockResponse);

      resourceService.deleteResource(0, 'heroes').subscribe(() => {
        // TODO: done(); statement
      });
    })
  );
});
