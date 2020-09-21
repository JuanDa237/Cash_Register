import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import { NavigationEnd, Router } from "@angular/router";

//Models
import { Company } from '../../../companyWorkArea/models/company';

//Services
import { CompaniesService } from '../../../companyWorkArea/services/companiesService/companies.service';
import { AuthenticationService } from '../../services/authentication/authentication.service';

@Component({
  selector: 'app-home-navbar',
  templateUrl: './home-navbar.component.html',
  styleUrls: ['./home-navbar.component.css']
})
export class HomeNavbarComponent implements OnInit {

  public company: Company;

  constructor(
    public authenticationService: AuthenticationService,
    public companiesService: CompaniesService,
    public router: Router,
    public location: Location
  ) {
    this.company = null;

    router.events.subscribe(event => {
      
      if (event instanceof NavigationEnd && location.path() == "/cashRegister" && this.authenticationService.loggedIn()) {
        
        this.companiesService.getCompany().subscribe(
          res => {
            this.company = res[0];
          },
          error => console.log(<any>error)
        );
      }
    });
  }

  ngOnInit(): void {
    
    this.authenticationService.logOut(false);
  }
}
