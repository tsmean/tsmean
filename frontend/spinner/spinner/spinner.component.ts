import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {

  @Input()
  size?: 'tiny' | 'small' | 'medium' | 'large' | 'huge' = 'medium';

  constructor() { }

  ngOnInit() {
  }

}
