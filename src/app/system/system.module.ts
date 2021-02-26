import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SystemComponent } from './system.component';
import { SystemRoutingModule } from './system-routing.module';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { DropdownDirective } from './shared/directives/dropdown.directive';
import { StudentsPageComponent } from './students-page/students-page.component';
import { FilterPipe } from './shared/pipes/filter.pipe';

@NgModule({
    declarations: [
        SystemComponent,
        SidebarComponent,
        HeaderComponent,
        StudentsPageComponent,
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
