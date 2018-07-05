import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import{tokenNotExpired} from 'angular2-jwt';
import { map } from 'rxjs/operators';
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
      .pipe(map((res: Response) => res.json()));
  }
  authenticateUser(user) {
    //post req to register
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/authenticate', user, { headers: headers })
      .pipe(map((res: Response) => res.json()));

  }
  getProfile(){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization',this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/users/profile', { headers: headers })
      .pipe(map((res: Response) => res.json()));

  }
  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;

  }
  loadToken(){
    const token= localStorage.getItem('id_token');
    this.authToken=token;
  }
  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
  loggedIn(){
    const token = localStorage.getItem('id_token');
    return tokenNotExpired('id_token');
  }
}
