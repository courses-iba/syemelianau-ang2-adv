import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SystemRoutingModule } from './system-routing.module';
import { SystemComponent } from './system.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { StudentsPageComponent } from './students-page/students-page.component';
import { StudentPageComponent } from './student-page/student-page.component';
import { ActivityPageComponent } from './activity-page/activity-page.component';
import { DropdownDirective } from './shared/directives/dropdown.directive';
import { FilterPipe } from './shared/pipes/filter.pipe';

@NgModule({
    declarations: [
        SystemComponent,
        SidebarComponent,
        HeaderComponent,
        StudentsPageComponent,
        StudentPageComponent,
        ActivityPageComponent,
        DropdownDirective,
        FilterPipe
    ],
    exports: [SystemComponent],
    imports: [
        CommonModule,
        SystemRoutingModule,
        FormsModule
    ]
})
export class SystemModule {}
