import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '../../shared/services/auth.service';
import { Message } from '../../shared/models/message.model';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
    loginMessage: Message;
    loginForm: FormGroup;

    constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router) {
        this.loginForm = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required, Validators.minLength(6)])
        });
    }

    ngOnInit(): void {
        if (this.authService.isLoggedIn()) {
            this.router.navigate(['/system']).then();
        }
        this.route.queryParamMap.subscribe(params =>
            this.loginMessage = params.get('canLogin')
                ? new Message(params.get('message'), 'success')
                : new Message(params.get('message'), 'danger')
        );
    }

    onSubmit(): void {
        this.authService.login(
            this.loginForm.controls.email.value,
            this.loginForm.controls.password.value,
            (message: string) => message
                ? this.loginMessage = new Message(message, 'danger')
                : this.router.navigate(['/system']).then()
        );
    }
}
