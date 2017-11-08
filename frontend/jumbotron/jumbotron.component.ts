import { Component, OnInit } from '@angular/core';
import {NotifyService} from 'notify-angular';

@Component({
  selector: 'app-jumbotron',
  templateUrl: './jumbotron.component.html',
  styleUrls: ['./jumbotron.component.scss']
})
export class JumbotronComponent implements OnInit {

  constructor(
      private notifyService: NotifyService
  ) { }

  ngOnInit() {
  }

  doStart() {
    document.getElementById('animal-input').scrollIntoView(); 
  }

}
