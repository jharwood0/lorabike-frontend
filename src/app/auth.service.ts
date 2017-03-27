import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class AuthService {
  constructor(private http: Http) { }

  createUser(username, email, password){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post('http://localhost:8080/api/user/', JSON.stringify({ username, email, password}), { headers })
      .map(res => res.json())
      .map((res) => {
        console.log(res);
        return res.success;
      });
  }

  getToken(){
    return localStorage.getItem('auth_token');
  }

  getUser(){
    console.log("Not implemented");
  }

  isLoggedIn(){
    if(localStorage.getItem('auth_token')){
      return true;
    }else{
      return false;
    }
  }

  logout(){
    localStorage.removeItem('auth_token');
  }

  login(username: string, password: string){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post('http://localhost:8080/api/user/authenticate', JSON.stringify({ username, password }), { headers })
      .map(res => res.json())
      .map((res) => {
        if (res.success) {
          console.log("successful login!");
          localStorage.setItem('auth_token', res.token);
        }
        return res.success;
      });
  }

}
