import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  
  public company: string;

  constructor() {
    this.company = "Del Perrero";
  }

}
