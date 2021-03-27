import { Component } from '@angular/core';

import { sidebarAnimations } from '../../../../animations';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css'],
    animations: sidebarAnimations
})
export class SidebarComponent {}
