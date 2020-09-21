import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//Services
import { AuthenticationService } from "../../services/authentication/authentication.service";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html'
})
export class SignInComponent implements OnInit {

  public user = {
    userName: "",
    password: ""
  };

  public error: Array<boolean>;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ){
    this.error = new Array<boolean>(2);
  }

  ngOnInit(): void {

    this.authenticationService.logOut(false);
  }

  public signIn(): void {
    
    this.authenticationService.signIn(this.user).subscribe(
      res => {
        localStorage.setItem("token", res.headers.get("token"));
        this.router.navigate(["/cashRegister"]);
      },
      err => {
        if(err.status == 404) {
          this.error[0] = true;
          this.error[1] = false;
        }
        else if(err.status == 401) {
          this.error[0] = false;
          this.error[1] = true;
        }
      }
    );
  }

  public enterEvent(event: any): void {
    this.signIn();    
  }
}
