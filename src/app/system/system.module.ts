import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SystemComponent } from './system.component';
import { SystemRoutingModule } from './system-routing.module';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { ProfileDropdownDirective } from './shared/directives/profile-dropdown.directive';

@NgModule({
    declarations: [
        SystemComponent,
        SidebarComponent,
        HeaderComponent,
        ProfileDropdownDirective
    ],
    exports: [SystemComponent],
    imports: [
        CommonModule,
        SystemRoutingModule
    ]
})
export class SystemModule {}
