import { Component } from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isBorderlessPage: boolean;

  constructor(
    router: Router
  ) {
    const handleRouteChange = () => {
      router.events.subscribe(newRoute => {
        if (newRoute instanceof NavigationEnd) {

          // Decide which pages get a border and which not
          const borderlessPages = ['/'];
          this.isBorderlessPage = borderlessPages.indexOf(newRoute.urlAfterRedirects) > -1;

        }
      });
    };
    handleRouteChange();

  }


}
