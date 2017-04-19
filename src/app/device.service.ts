import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { AuthService } from './auth.service';

import { Device } from './models/device';

@Injectable()
export class DeviceService {
  public devices : Observable<Device[]>;

  constructor (private http: Http, private authService: AuthService) {
    let headers = new Headers({ 'Authorization': 'Bearer ' + this.authService.getToken()});
    let options = new RequestOptions({headers:headers});
    this.devices = Observable.interval(5000)
      .switchMap(() => this.http.get("http://lora.bike:8081/api/device/", options))
      .map(res => res.json())
      .share(); /* stops re execution of get request for multiple subscribers */
  }

  public registerDevice(name: string, devEUI: string, description: string){
    let headers = new Headers({ 'Authorization': 'Bearer ' + this.authService.getToken()});
    let options = new RequestOptions({headers:headers});
    headers.append('Content-Type', 'application/json');

    return this.http.post('http://lora.bike:8081/api/device/', JSON.stringify({ name, devEUI, description }), options)
      .map(res => res.json())
      .map((res) => {
        return res.success;
      });
  }

  private extractData(res: Response) {
    let body = res.json();
    return body.data || { };
  }
  private handleError (error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
