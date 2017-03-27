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
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  username : string;
  email : string;
  password : string;
  passwordConfirm : string;

  isLoading: boolean = false;
  errors: Array<Error> = new Array<Error>();

  constructor(private authService : AuthService, private router : Router) { }

  ngOnInit() {
  }

  register(){
    this.errors = new Array<Error>();
    this.isLoading = true;
    if(this.passwordConfirm !== this.password){
      this.errors.push(new Error("Passwords do not match"));
    }else{
      this.authService.createUser(this.username, this.email, this.password).subscribe((result) => {
        if(result){
          this.isLoading = false;
          this.router.navigate(['login']);
        }else{
          this.isLoading = false;
          this.errors.push(new Error("Unable to create account, try again later"));
        }
      });
    }
  }
}
