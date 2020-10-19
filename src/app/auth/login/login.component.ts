import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { UsersService } from '../../shared/services/users.service';
import { User } from '../../shared/models/user.model';
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

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {}

  onSubmit(): void {
    let message;
    this.usersService.getUserByEmail(
      this.loginForm.controls.email.value,
      this.loginForm.controls.password.value
    ).pipe(catchError(() => {
      message = 'Извините, что-то пошло не так, попробуйте еще раз';
      return of([]);
    })).subscribe((users: Array<User>) => {
      message = users.length === 0 ? 'Такого пользователя не существует' : '';
      this.loginMessage = new Message(message, 'danger');
    });
  }
}
