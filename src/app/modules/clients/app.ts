import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Controller } from './controller';
import { Router } from './route';

import { HelpersModule } from '@shared/helpers';
import { ClientsComponent } from '@modules/clients/pages/clients/controller';
import { GroupsComponent } from '@modules/clients/pages/groups';
import { ReactiveFormsModule } from '@angular/forms';
import { AddModalService } from '@modules/clients/pages/clients/components/add-modal';
import { ChangeModalService } from '@modules/clients/pages/clients/components/change-modal';
import { CalendarModule } from 'primeng/calendar';
import { AddModalGroup } from '@modules/clients/pages/groups/pages/list/components/add-modal';
import { ChangeModalGroup } from '@modules/clients/pages/groups/pages/list/components/change-modal';
import { GroupsListComponent } from '@modules/clients/pages/groups/pages/list';
import { GroupsDetailsComponent } from '@modules/clients/pages/groups/pages/details';
import { ChangeCustomerGroupModalService } from '@modules/clients/pages/groups/pages/details/change-modal';
import { ClientsListComponent } from '@modules/clients/pages/clients/pages/list';
import { ClientsDetailsComponent } from '@modules/clients/pages/clients/pages/details';

@NgModule({
  imports: [Router, CommonModule, HelpersModule, ReactiveFormsModule, CalendarModule],
  declarations: [Controller, ClientsComponent, GroupsComponent, AddModalService, ChangeModalService, AddModalGroup, ChangeModalGroup, GroupsListComponent, GroupsDetailsComponent, ChangeCustomerGroupModalService, ClientsListComponent, ClientsDetailsComponent],
  exports: [Controller],
})

export class ClientsModule {
}
