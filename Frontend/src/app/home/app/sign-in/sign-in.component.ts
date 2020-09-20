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

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ){}

  ngOnInit(): void {

    this.authenticationService.logOut(false);
  }

  public signIn(): void {
    
    this.authenticationService.signIn(this.user).subscribe(
      res => {
        localStorage.setItem("token", res.headers.get("token"));
        this.router.navigate(["/cashRegister"]);
      },
      err => console.log(<any>err)
    );
  }
}
