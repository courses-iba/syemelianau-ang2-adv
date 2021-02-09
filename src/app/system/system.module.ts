import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SystemComponent } from './system.component';
import { SystemRoutingModule } from './system-routing.module';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';

@NgModule({
    declarations: [
        SystemComponent,
        SidebarComponent
    ],
    exports: [SystemComponent],
    imports: [
        CommonModule,
        SystemRoutingModule
    ]
})
export class SystemModule {}
