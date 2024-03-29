import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SystemComponent } from './system.component';
import { StudentsPageComponent } from './students-page/students-page.component';
import { StudentPageComponent } from './student-page/student-page.component';
import { ActivityPageComponent } from './activity-page/activity-page.component';
import { StatisticsPageComponent } from './statistics-page/statistics-page.component';

const routes: Routes = [{
    path: '', component: SystemComponent, children: [
        { path: '', redirectTo: 'students', pathMatch: 'full' },
        { path: 'students', component: StudentsPageComponent },
        { path: 'student', component: StudentPageComponent },
        { path: 'activity', component: ActivityPageComponent },
        { path: 'statistics', component: StatisticsPageComponent }
    ]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SystemRoutingModule {}
