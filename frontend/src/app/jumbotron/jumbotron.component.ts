import {Component, OnInit} from '@angular/core';
import {NotifyService} from '@tsmean/toast';

@Component({
  selector: 'app-jumbotron',
  templateUrl: './jumbotron.component.html',
  styleUrls: ['./jumbotron.component.scss']
})
export class JumbotronComponent implements OnInit {
  constructor(private notifyService: NotifyService) {}

  ngOnInit() {}

  doStart() {
    const animalInput = document.getElementById('animal-input');
    if (animalInput) {
      animalInput.scrollIntoView();
    }
  }
}
