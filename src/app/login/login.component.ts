import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';


export class Error {
  message: string;
  constructor(message: string) {
        this.message = message;
    }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isLoading: boolean = false;

  username: string;
  password: string;

  errors: Array<Error> = new Array<Error>();

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    if(this.authService.isLoggedIn()){
      this.router.navigate(['dashboard']);
    }
    console.log("init");
    console.log(this.authService.isLoggedIn());
  }

  login(){
    this.errors = new Array<Error>();
    this.isLoading = true;
    this.authService.login(this.username, this.password).subscribe((result) => {
      if(result){
        this.isLoading = false;
        this.router.navigate(['dashboard']);
      }else{
        this.isLoading = false;
        this.errors.push(new Error("Incorrect username or password"));
      }
    });
  }

}
