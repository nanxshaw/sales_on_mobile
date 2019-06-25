import {Injectable} from '@angular/core';

import 'rxjs/add/operator/map';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/throw';
import {Http, Headers, RequestOptions} from '@angular/http';

@Injectable()
export class RestProvider {
  api = 'http://operation.kpptechnology.co.id/nanang/sales/api';
  constructor(
    public http: Http) {
    console.log('Hello RestProvider Provider');
  }

  getRest(url) {
    return new Promise((resolve, reject) => {
      this.http.get(this.api+'/'+url)
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }

  postRest(url, data) {
    return new Promise((resolve, reject) => {
      let header = new Headers();
      header.append('Content-type', 'application/json');
      let options = new RequestOptions({headers: header});
      this.http.post(this.api+'/'+url, JSON.stringify(data), options)
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }
}
