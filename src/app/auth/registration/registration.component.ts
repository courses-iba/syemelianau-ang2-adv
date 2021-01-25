import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registrationForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email], this.authService.isEmailTaken()),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    name: new FormControl('', [Validators.required]),
    agree: new FormControl('', [Validators.required, Validators.requiredTrue])
  });

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit(): void {
    this.authService.registration(
      this.registrationForm.controls.email.value,
      this.registrationForm.controls.password.value,
      this.registrationForm.controls.name.value,
      (message, ok) =>
        this.router.navigate(['/login'], { queryParams: { message, canLogin: ok } })
    );
  }
}
