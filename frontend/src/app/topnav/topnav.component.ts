import { Component, OnInit } from '@angular/core';
import {LoginService} from '../user/login.service';


@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.css']
})
export class TopnavComponent implements OnInit {

  constructor(
    private loginService: LoginService
  ) { }

  loggedIn(): boolean {
    return this.loginService.loggedIn();
  }

  logOut() {
    this.loginService.logOut();
  }

  ngOnInit() {
  }

}
