import {forwardRef, Inject, Injectable, InjectionToken} from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/catch';
import {Resource} from './resource';

import { WebUtils } from '@tsmean/utils';
import {Observable} from 'rxjs/Observable';
import {ApiUrl} from './api-url-injection-token';

@Injectable()
export class ResourceService {

  constructor(
    @Inject(ApiUrl) private apiUrl: string,
    private http: Http
  ) { }

  /**
   * Url to web api, appended with resource name
   * yields e.g http://myserver/api/v1/users
   */
  private resourcesUrl(resourceName: string) {
    return WebUtils.urlJoin(
      this.apiUrl,
      resourceName);
  };


  getResources(resourceName: string): Observable<Resource[]> {
    const $data = this.http.get(this.resourcesUrl(resourceName))
      .map(resp => resp.json().data).share();
    return $data.catch(this.handleError);
  }

  getResource(resourceId: string, resourceName: string): Observable<Resource> {
    const $data = this.http.get(WebUtils.urlJoin(this.resourcesUrl(resourceName), resourceId))
      .map(resp => resp.json().data).share();
    return $data
      .catch(this.handleError);
  }

  createResource(newResource: Resource, resourceName: string): Observable<Resource> {
    const $data = this.http.post(this.resourcesUrl(resourceName), newResource)
      .map(resp => resp.json().data).share();
    return $data.catch(this.handleError);
  }

  updateResource(resource: Resource, resourceName: string): Observable<Resource> {

    const $data = this.http.put(this.resourcesUrl(resourceName), resource)
      .map(resp => resp.json().data).share();
    return $data
      .catch(this.handleError);
  }

  deleteResource(resourceId: string, resourceName: string): Observable<Resource> {

    const $data = this.http.delete(WebUtils.urlJoin(this.resourcesUrl(resourceName), resourceId))
      .map(resp => resp.json().data).share();
    return $data
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
