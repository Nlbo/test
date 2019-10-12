import { Component, Input, Output, EventEmitter } from '@angular/core';

import { SidebarNavigation } from '@models/sidebar-nav';

@Component({
  selector    : 'sidebar',
  templateUrl : './index.html',
  styleUrls   : ['./index.scss'],
})
export class Sidebar {
  @Input() routes: SidebarNavigation[] = [];

}
