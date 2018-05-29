import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class AnimalListDashboardListStore {
  private animalsLists = new BehaviorSubject<number[]>([]);
  private currentList = new BehaviorSubject<number>(1);

  constructor() {
  }

  /**
   * Adds a resourceId to the list. If no position is provided, appends it to the end.
   */
  add(resourceId: number, index?: number): void {
    const currentValue: number[] = this.animalsLists.getValue(); // todo: check immutability
    if (index !== undefined) {
      if (index <= currentValue.length) {
        currentValue.splice(index, 0, resourceId);
        this.animalsLists.next(currentValue);
      } else {
        throw new Error('Index of bounds. Cannot add animal.');
      }
    } else {
      currentValue.push(resourceId);
      this.animalsLists.next(currentValue);
    }
  }

  /**
   * Resets the entire list
   */
  set(newList: number[]): void {
    this.animalsLists.next(newList);
  }

  /**
   * Change active animal list
   */
  setCurrent(currentListId: number): void {
    this.currentList.next(currentListId);
  }

  /**
   * Remove a single item from the list by its id
   */
  removeById(resourceId: number): void {
    const currentValue = this.animalsLists.getValue();
    this.animalsLists.next(currentValue.filter(id => id !== resourceId));
  }

  /**
   * Remove a single item from the list by its position
   */
  removeByIndex(index: number): void {
    const currentValue = this.animalsLists.getValue();
    currentValue.splice(index, 1);
    this.animalsLists.next(currentValue);
  }

  /**
   * Get the list-observable
   */
  get(): BehaviorSubject<number[]> {
    return this.animalsLists;
  }

  /**
   * Get active animal list observable
   */
  getCurrent(): BehaviorSubject<number> {
    return this.currentList;
  }

  /**
   * Update an item in the list by its index
   */
  updateByIndex(index: number, newResourceId: number): void {
    const currentValue = this.animalsLists.getValue();
    if (index <= currentValue.length) {
      currentValue[index] = newResourceId;
      this.animalsLists.next(currentValue);
    } else {
      throw new Error('Index of bounds. Cannot update animal list.');
    }
  }

  /**
   * Update an item in the list by its id
   */
  updateById(id: number, newResourceId: number): void {
    const currentValue = this.animalsLists.getValue();
    const newValue = currentValue.map(x => (x === id ? newResourceId : x));
    this.animalsLists.next(newValue);
  }
}
