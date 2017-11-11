import { TestBed, inject } from '@angular/core/testing';

import { ResourceService } from './resource.service';
import {HttpModule, ResponseOptions, XHRBackend, Response} from '@angular/http';
import {MockBackend, MockConnection} from '@angular/http/testing';
import {ApiUrl} from './api-url-injection-token';

describe('ResourceService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: ApiUrl, useValue: 'http://demo.tsmean.com:4242/api/v1/' },
        ResourceService,
        { provide: XHRBackend, useClass: MockBackend }
      ],
      imports: [
        HttpModule
      ]
    });
  });

  it('should be able to create the service',
    inject([ResourceService, XHRBackend],
      (resourceService: ResourceService, mockBackend: MockBackend) => {
        expect(resourceService).toBeTruthy();
      })
  );

  it('should be able to get a list of resources',
    inject([ResourceService, XHRBackend],
    (resourceService: ResourceService, mockBackend: MockBackend) => {

      const mockResponse = {
        data: [
          { id: 0, name: 'Wolverine' },
          { id: 1, name: 'Wonder Woman' }
        ]
      };

      mockBackend.connections.subscribe((connection: MockConnection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });

      resourceService.getResources('heroes').subscribe(heroes => {
        expect(heroes.length).toBe(2);
        expect(heroes[0].name).toEqual('Wolverine');
        expect(heroes[1].name).toEqual('Wonder Woman');
      });

    })
  );

  it('should be able to get a single resource',
    inject([ResourceService, XHRBackend],
      (resourceService: ResourceService, mockBackend: MockBackend) => {

        const mockResponse = {
          data: { id: 0, name: 'Wolverine' }
        };

        mockBackend.connections.subscribe((connection: MockConnection) => {
          connection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(mockResponse)
          })));
        });

        resourceService.getResource('0', 'heroes').subscribe(hero => {
          expect(hero.id).toBe(0);
          expect(hero.name).toBe('Wolverine');
        });

      })
  );

  it('should be able to create a resource',
    inject([ResourceService, XHRBackend],
      (resourceService: ResourceService, mockBackend: MockBackend) => {

        const mockResponse = {
          data: { id: 0, name: 'Wolverine' }
        };

        mockBackend.connections.subscribe((connection: MockConnection) => {
          connection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(mockResponse)
          })));
        });

        resourceService.createResource({
          name: 'Wolverine'
        }, 'heroes').subscribe(hero => {
          expect(hero.id).toBe(0);
          expect(hero.name).toBe('Wolverine');
        });

      })
  );

  it('should be able to update a resource',
    inject([ResourceService, XHRBackend],
      (resourceService: ResourceService, mockBackend: MockBackend) => {

        const mockResponse = {
          data: { id: 0, name: 'Stella' }
        };

        mockBackend.connections.subscribe((connection: MockConnection) => {
          connection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(mockResponse)
          })));
        });

        resourceService.updateResource({
          name: 'Wolverine'
        }, 'heroes').subscribe(hero => {
          expect(hero.id).toBe(0);
          expect(hero.name).toBe('Stella');
        });

      })
  );

  it('should be able to delete a resource',
    inject([ResourceService, XHRBackend],
      (resourceService: ResourceService, mockBackend: MockBackend) => {

        const mockResponse = {
          data: { id: 0, name: 'Wolverine' }
        };

        mockBackend.connections.subscribe((connection: MockConnection) => {
          connection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(mockResponse)
          })));
        });

        resourceService.deleteResource('0', 'heroes').subscribe(hero => {
          expect(hero.name).toBe('Wolverine');
        });

      })
  );


});
