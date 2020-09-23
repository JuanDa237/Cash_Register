import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';

import { AuthenticationService } from '../authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(
    private authenticationService: AuthenticationService
  ){}

  intercept(request, next) {
    
    const tokenizeRequest = request.clone({
      setHeaders: {
        "authentication-token": `Bearer ${this.authenticationService.getToken()}`
      }
    });

    return next.handle(tokenizeRequest);
  }
}
