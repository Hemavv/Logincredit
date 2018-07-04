import { Injectable } from '@angular/core';
import { Http,Response, Headers } from '@angular/http';
import{map}from'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  authToken: any;
  user: any;

  constructor(private http: Http) { }
  registerUser(user) { //post req to register
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/register', user, { headers: headers })
.pipe(map((res:Response) => res.json()));


  }
}
