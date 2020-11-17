import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../shared/services/auth.service';
import { Message } from '../../shared/models/message.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginMessage: Message;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  onSubmit(): void {
    this.authService.login(
      this.loginForm.controls.email.value,
      this.loginForm.controls.password.value,
      (message: string) => this.loginMessage = new Message(message, 'danger')
    );
  }
}
