import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';

type AuthGuardTypes = Observable<boolean> | Promise<boolean> | boolean;

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanActivateChild {

    constructor(private authService: AuthService, private router: Router) {}

    canActivate(): AuthGuardTypes {
        if (this.authService.isLoggedIn()) {
            return true;
        }
        this.router.navigate(['login'], {
            queryParams: {
                message: 'Для работы с системой Вам нужно залогиниться',
                canLogin: false
            }
        });
        return false;
    }

    canActivateChild(): AuthGuardTypes {
        if (this.authService.isLoggedIn()) {
            this.router.navigate(['system']);
            return false;
        }
        return true;
    }
}
