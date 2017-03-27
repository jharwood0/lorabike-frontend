import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { User } from './models/user';
import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class AuthService {
  jwtHelper: JwtHelper = new JwtHelper();
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

  getId(){
    return this.jwtHelper.decodeToken(this.getToken())._id;
  }

  getToken(){
    return localStorage.getItem('auth_token');
  }

  getUser() : Promise<User> {
    let headers = new Headers({ 'Authorization': 'Bearer ' + this.getToken()});
    let options = new RequestOptions({headers:headers});
    return this.http.get("http://localhost:8080/api/user/"+this.getId(), options)
              .map(res => res.json())
              .map(user => {
                return new User(user);
              }).toPromise();
  }

  private extractData(res: Response) {
  let body = res.json();
  return body.data || { };
}
private handleError (error: Response | any) {
  // In a real world app, we might use a remote logging infrastructure
  let errMsg: string;
  if (error instanceof Response) {
    const body = error.json() || '';
    const err = body.error || JSON.stringify(body);
    errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
  } else {
    errMsg = error.message ? error.message : error.toString();
  }
  console.error(errMsg);
  return Promise.reject(errMsg);
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
