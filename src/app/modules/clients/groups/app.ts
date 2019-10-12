import { NgModule }     from '@angular/core';
import { CommonModule } from '@angular/common';

import { Controller } from './controller';
import { Router }     from './route';
import { HelpersModule } from '@platform/shared-modules/helpers';
import { ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { List } from './pages/list';
import { AddModalGroup } from './pages/list/components/add-modal';
import { ChangeModalGroup } from './pages/list/components/change-modal';
import { Details } from './pages/details';
import { ChangeCustomerGroupModalService } from './pages/details/components/change-modal';

@NgModule({
  imports: [Router, CommonModule, HelpersModule, ReactiveFormsModule, CalendarModule],
  declarations : [ Controller, List, Details, AddModalGroup, ChangeModalGroup, ChangeCustomerGroupModalService ],
  exports      : [ Controller ],
})

export class GroupsModule { }
