import {Injectable} from '@angular/core';
import {Resource} from '@tsmean/shared';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class ResourceStoreService {
  /**
   * Store for resources.
   * For example, the store could have such a resource:
   * resourceStore['heroes']['412'] returns BehaviorSubject with .getValue() == {id: '412', name: 'Wolverine'}
   */
  private resourceStore: ResourceStore = {};

  /**
   * Precondition: resource.id needs to exist
   */
  addOrUpdate(resourceName: string, resource: Resource): void {
    // Initialization if not yet initialized already;
    this.resourceStore[resourceName] = this.resourceStore[resourceName] || {};

    if (this.resourceStore[resourceName][resource.id]) {
      // push next if already initialized
      this.resourceStore[resourceName][resource.id].next(resource);
    } else {
      // more initialization logic
      this.resourceStore[resourceName][resource.id] = new BehaviorSubject(resource);
    }
  }

  addOrUpdateMany(resourceName: string, resources: Resource[]): void {
    resources.forEach(resource => this.addOrUpdate(resourceName, resource));
  }

  remove(resourceName: string, resourceId: number): void {
    this.resourceStore[resourceName][resourceId].complete();
  }

  get(resourceName: string, resourceId: number): BehaviorSubject<Resource> {
    return this.resourceStore[resourceName][resourceId];
  }
}

interface ResourceStore {
  [resourceName: string]: {
    [resourceId: string]: BehaviorSubject<Resource>;
  };
}
