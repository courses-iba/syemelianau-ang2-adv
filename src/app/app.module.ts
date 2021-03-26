import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import locale from '@angular/common/locales/ru-BY';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { SystemModule } from './system/system.module';
import { NotFoundModule } from './not-found/not-found.module';

registerLocaleData(locale);

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        AppRoutingModule,
        AuthModule,
        SystemModule,
        NotFoundModule
    ],
    bootstrap: [AppComponent],
    providers: [{ provide: LOCALE_ID, useValue: 'ru-BY' }]
})
export class AppModule {}
