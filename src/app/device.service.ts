import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { AuthService } from './auth.service';

import { Device } from './models/device';

@Injectable()
export class DeviceService {
  private deviceUrl = 'http://localhost:8080/api/device/';
  constructor (private http: Http, private authService: AuthService) {}

  private createAuthHeader() : Headers {
    let headers = new Headers();
    headers.append('Authorization', `Bearer ${this.authService.getToken()}`);
    console.log("Headers = "+headers.get('Authorization'));
    return headers;
  }
  getDevices() : Observable<Device[]> {
    let headers = this.createAuthHeader();
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.deviceUrl, options) /* Fix This */
                    .map(this.extractData)
                    .catch(this.handleError);
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
