import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { AuthGuardService } from './shared/services/auth-guard.service';

const routes: Routes = [
    {
        path: '',
        canActivateChild: [AuthGuardService],
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
    }, {
        path: 'system',
        canActivate: [AuthGuardService],
        loadChildren: () => import('./system/system.module').then(m => m.SystemModule)
    },
    { path: '**', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {
        relativeLinkResolution: 'legacy',
        preloadingStrategy: PreloadAllModules
    })],
    exports: [RouterModule]
})
export class AppRoutingModule {}
