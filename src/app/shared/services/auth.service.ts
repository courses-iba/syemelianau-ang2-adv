import { Injectable } from '@angular/core';
import { AsyncValidatorFn } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { AsyncEmailValidator } from '../validators/async-email.validator';
import { User } from '../models/user.model';
import { UsersService } from './users.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private message = '';

    constructor(private usersService: UsersService) {}

    private error = catchError(() => {
        this.message = 'Извините, что-то пошло не так, попробуйте еще раз';
        return of();
    });

    login(email: string, password: string, callback: (message: string) => void): void {
        this.message = '';
        this.usersService.login(email, password)
            .pipe(this.error)
            .subscribe((user: User) => {
                user && user.password === password
                    ? sessionStorage.setItem('user', JSON.stringify(user))
                    : this.message = 'Такого пользователя не существует';
                callback(this.message);
            });
    }

    registration(email: string, password: string, name: string, callback: (message: string, ok: boolean) => void): void {
        this.message = '';
        this.usersService.registration(email, password, name)
            .pipe(this.error)
            .subscribe((user: User) => {
                this.message = user ? 'Теперь Вы можете зайти в систему' : 'Ошибка регистрации';
                callback(this.message, !!user);
            });
    }

    logout(): void {
        sessionStorage.removeItem('user');
    }

    isLoggedIn(): boolean {
        return !!sessionStorage.getItem('user');
    }

    isEmailTaken(): AsyncValidatorFn {
        return AsyncEmailValidator(this.usersService);
    }
}
