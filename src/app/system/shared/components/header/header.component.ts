import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../../../shared/services/auth.service';
import { User } from '../../../../shared/models/user.model';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    date: Date;
    user: User;

    constructor(private authService: AuthService, private router: Router) {
        this.date = new Date();
    }

    ngOnInit(): void {
        setInterval(() => this.date = new Date(), 1000);
        if (this.authService.isLoggedIn()) {
            this.user = this.authService.getLoggedUser();
        }
    }

    logout(): void {
        this.authService.logout();
        this.router.navigate(['/login']).then();
    }
}
