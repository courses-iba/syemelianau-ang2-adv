import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  constructor() {}

  ngOnInit(): void {
  }

  emailErrorMessages(): string {
    const message1 = 'Введите корректный email.';
    const message2 = 'Email не может быть пустым.';
    return this.loginForm.controls.email.hasError('email')
      ? message1 : this.loginForm.controls.email.hasError('required')
        ? `${message1} ${message2}` : '';
  }

  passwordErrorMessages(): string {
    const message1 = `Пароль должен быть больше 6 символов. Сейчас ${this.loginForm.controls.password.value.length}.`;
    const message2 = 'Пароль не может быть пустым.';
    return this.loginForm.controls.password.hasError('minlength')
      ? message1 : this.loginForm.controls.password.hasError('required')
        ? message2 : '';
  }

}
