import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SystemComponent } from './system.component';

const routes: Routes = [
    { path: 'system', component: SystemComponent },
    { path: '**', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SystemRoutingModule {}
