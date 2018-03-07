import {Component, Input, OnInit} from '@angular/core';

import {AnimalList} from '../animal-list.model';

@Component({
  selector: 'app-display-animal-lists',
  templateUrl: './display-animal-lists.component.html',
  styleUrls: ['./display-animal-lists.component.css']
})
export class DisplayAnimalListsComponent implements OnInit {
  @Input() listIds: string[];

  constructor() {}

  ngOnInit() {}
}
