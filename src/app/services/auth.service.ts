import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { UserModel } from '../models/user-model';

@Injectable()
export class AuthService {
  currentUser: UserModel;

  keyName = 'app_inventory_user';
  keyValues = { 'email': '', 'token': '' };
  liveService = false; // is data from live server
  appIP = this.liveService ? 'http://127.0.0.1:8000/' : '/assets/mocks_data/'; // target APIs IP

  constructor(private http: HttpClient) { }

  public setLoggedUser(userObj) {
    this.currentUser = new UserModel(userObj.name, userObj.email, userObj.role, userObj.token);
    // store in local storage
    this.keyValues['name'] = userObj.name;
    this.keyValues['email'] = userObj.email;
    this.keyValues['role'] = userObj.role; // should come dynamically from server. But for demo, keeping it.
    this.keyValues['token'] = userObj.token;
    localStorage.setItem(this.keyName, JSON.stringify(this.keyValues));
  }

  public getLoggedinUser(): UserModel {
    // return currentUser by setting it if not set
    return this.currentUser ? this.currentUser
                            : this.currentUser = JSON.parse(localStorage.getItem(this.keyName));
  }

  public setTokenHeader() {
    // return Authorization header with token
    let headers = new HttpHeaders();
    return headers = headers.set('Authorization', 'bearer ' + this.getLoggedinUser().token);
  }

  public logoutUser(): Observable<any> {
    return Observable.create(observer => {
      this.currentUser = null;
      localStorage.removeItem(this.keyName);

      observer.next(true);
      observer.complete();
    });
  }

}
