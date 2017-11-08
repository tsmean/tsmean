import {Component, Input, OnInit} from '@angular/core';
import {Animal} from '../animal';

@Component({
  selector: 'animal-dashboard-list',
  templateUrl: './display-animal-list.component.html',
  styleUrls: ['./display-animal-list.component.css']
})
export class DisplayAnimalListComponent implements OnInit {

  @Input()
  animalIds: string[];

  constructor() { }

  ngOnInit() {

  }

}
