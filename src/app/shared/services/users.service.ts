import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiUri = environment.apiUrl + '/users';

  constructor(private http: HttpClient) {}

  getUserByEmail(email: string, password: string): Observable<User> {
    return this.http.get<User>(`${this.apiUri}?email=${email}&password=${password}`);
  }

}
