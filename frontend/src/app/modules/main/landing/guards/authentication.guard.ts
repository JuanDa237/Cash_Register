import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';

//Services
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ){}

  canActivate(): boolean {
    
    if(this.authenticationService.loggedIn()) {
      return true;
    }
    
    this.router.navigate(["/error/401"]);
    return false;
  }
}