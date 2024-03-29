import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
    declarations: [
        AuthComponent,
        LoginComponent,
        RegistrationComponent
    ],
    exports: [AuthComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        AuthRoutingModule
    ]
})
export class AuthModule {}
