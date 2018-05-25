import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-animal-dashboard-list',
  templateUrl: './display-animal-list.component.html',
  styleUrls: ['./display-animal-list.component.scss']
})
export class DisplayAnimalListComponent implements OnInit {
  @Input() animalIds: string[];
  @Input() listId: number;

  constructor() {}

  ngOnInit() {}
}
