import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { User } from '../models/user.model';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private usersService: UsersService) {}

  login(email: string, password: string, callback: (message: string) => void): void {
    let message = '';
    this.usersService.getUserByEmail(email, password).pipe(catchError(() => {
      message = 'Извините, что-то пошло не так, попробуйте еще раз';
      return of();
    })).subscribe((user: User) => {
      user && user.password === password
        ? localStorage.setItem('user', JSON.stringify(user))
        : message = 'Такого пользователя не существует';
      callback(message);
    });
  }

  logout(): void {
    localStorage.removeItem('user');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }
}
