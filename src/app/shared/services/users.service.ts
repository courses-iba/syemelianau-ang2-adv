import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUri = environment.apiUrl + '/users';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<User> {
    return this.http.get<User>(`${this.apiUri}?email=${email}&password=${password}`).pipe(map(res => res[0]));
  }

  registration(email: string, password: string, name: string): Observable<User> {
    return this.http.post<User>(this.apiUri, new User(email, password, name));
  }

  getUserByEmail(email: string): Observable<User> {
    return this.http.get<User>(`${this.apiUri}?email=${email}`).pipe(map(res => res[0]));
  }
}
