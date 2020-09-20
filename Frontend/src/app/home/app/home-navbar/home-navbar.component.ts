import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication/authentication.service';

@Component({
  selector: 'app-home-navbar',
  templateUrl: './home-navbar.component.html',
  styleUrls: ['./home-navbar.component.css']
})
export class HomeNavbarComponent implements OnInit {

  company: string;

  constructor(
    public authenticationService: AuthenticationService
  ) {
    this.company = "Del Perrero";
  }

  ngOnInit(): void {

    this.authenticationService.logOut(false);
  }

}
