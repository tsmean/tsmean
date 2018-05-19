import {inject, TestBed} from '@angular/core/testing';

import {AnimalListDashboardListStore} from './animal-list-dashboard-list.store';

describe('Animals Lists Dashboard List Store Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AnimalListDashboardListStore]
    });
  });

  it(
    'should be able to create the service',
    inject([AnimalListDashboardListStore], (dashboardListStore: AnimalListDashboardListStore) => {
      expect(dashboardListStore).toBeTruthy();
    })
  );

  it(
    'should be able to add items',
    inject([AnimalListDashboardListStore], (dashboardListStore: AnimalListDashboardListStore) => {
      dashboardListStore.add(1);
      dashboardListStore.add(2);
      dashboardListStore.get().subscribe(newList => {
        expect(newList.length).toEqual(2);
        expect(newList[0]).toEqual(1);
        expect(newList[1]).toEqual(2);
      });
    })
  );

  it(
    'should be able to add item at index',
    inject([AnimalListDashboardListStore], (dashboardListStore: AnimalListDashboardListStore) => {
      dashboardListStore.add(1);
      dashboardListStore.add(2, 0);
      dashboardListStore.get().subscribe((newList: number[]) => {
        expect(newList.length).toEqual(2);
        expect(newList[0]).toEqual(2);
        expect(newList[1]).toEqual(1);
      });
    })
  );

  it(
    'should be update item by id',
    inject([AnimalListDashboardListStore], (dashboardListStore: AnimalListDashboardListStore) => {
      dashboardListStore.add(1);
      dashboardListStore.add(2);
      dashboardListStore.updateById(1, 5);
      dashboardListStore.get().subscribe(newList => {
        expect(newList.length).toEqual(2);
        expect(newList[0]).toEqual(5);
        expect(newList[1]).toEqual(2);
      });
    })
  );

  it(
    'should be update item by index',
    inject([AnimalListDashboardListStore], (dashboardListStore: AnimalListDashboardListStore) => {
      dashboardListStore.add(1);
      dashboardListStore.add(2);
      dashboardListStore.updateByIndex(0, 5);
      dashboardListStore.get().subscribe(newList => {
        expect(newList.length).toEqual(2);
        expect(newList[0]).toEqual(5);
        expect(newList[1]).toEqual(2);
      });
    })
  );

  it(
    'should be remove item by id',
    inject([AnimalListDashboardListStore], (dashboardListStore: AnimalListDashboardListStore) => {
      dashboardListStore.add(1);
      dashboardListStore.add(2);
      dashboardListStore.removeById(1);
      dashboardListStore.get().subscribe(newList => {
        expect(newList.length).toEqual(1);
        expect(newList[0]).toEqual(2);
      });
    })
  );

  it(
    'should be remove item by index',
    inject([AnimalListDashboardListStore], (dashboardListStore: AnimalListDashboardListStore) => {
      dashboardListStore.add(1);
      dashboardListStore.add(2);
      dashboardListStore.removeByIndex(0);
      dashboardListStore.get().subscribe(newList => {
        expect(newList.length).toEqual(1);
        expect(newList[0]).toEqual(2);
      });
    })
  );
});
