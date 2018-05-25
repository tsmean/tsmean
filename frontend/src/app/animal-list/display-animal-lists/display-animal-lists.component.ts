import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-display-animal-lists',
  templateUrl: './display-animal-lists.component.html',
  styleUrls: ['./display-animal-lists.component.scss']
})
export class DisplayAnimalListsComponent implements OnInit {
  @Input() listIds: string[];

  constructor() {}

  ngOnInit() {}
}
