import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient, private auth: AuthService) { }

  getAllUsers(): Observable<any> {
    // return list of all users
    return this.http.get(this.auth.appIP + 'all_users.json');
  }

  getAllProducts() {
    // return list of available products
    return this.http.get(this.auth.appIP + 'all_products.json');
  }
}
