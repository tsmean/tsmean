import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Resource, ResourceWithoutId} from '@tsmean/shared';

import {ApiUrl} from './api-url-injection-token';
import {catchError, map, share} from 'rxjs/operators';

@Injectable()
export class ResourceService {
  constructor(@Inject(ApiUrl) private apiUrl: string, private http: HttpClient) {
  }

  /**
   * Url to web api, appended with resource name
   * yields e.g http://myserver/api/v1/users
   */
  resourcesUrl(resourceName: string) {
    return this.apiUrl + '/' + resourceName;
  }

  getResources(resourceName: string): Observable<Resource[]> {
    const $data = this.http
      .get(this.resourcesUrl(resourceName))
      .pipe(
        map((resp: any) => resp.data),
        share()
      );
    return $data.pipe(
      catchError(this.handleError)
    );
  }

  getResource(resourceId: number, resourceName: string): Observable<Resource> {
    const $data = this.http
      .get(this.resourcesUrl(resourceName) + '/' + resourceId)
      .pipe(
        map((resp: any) => resp.data),
        share()
      );
    return $data.pipe(
      catchError(this.handleError)
    );
  }

  createResource(newResource: ResourceWithoutId, resourceName: string): Observable<Resource> {
    const $data = this.http
      .post(this.resourcesUrl(resourceName), newResource)
      .pipe(
        map((resp: any) => resp.data),
        share()
      );
    return $data.pipe(
      catchError(this.handleError)
    );
  }

  updateResource(resource: Resource, resourceName: string): Observable<Resource> {
    const $data = this.http
      .put(this.resourcesUrl(resourceName), resource)
      .pipe(
        map((resp: any) => resp.data),
        share()
      );
    return $data.pipe(
      catchError(this.handleError)
    );
  }

  // TODO: what do you get back?
  deleteResource(resourceId: number, resourceName: string): Observable<void> {
    const $data = this.http
      .delete(this.resourcesUrl(resourceName) + '/' + resourceId)
      .pipe(
        map((resp: any) => resp.data),
        share()
      );

    return $data.pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
