import { NgModule }     from '@angular/core';
import { CommonModule } from '@angular/common';

import { Controller } from './controller';
import { Router }     from './route';
import { HelpersModule } from '@platform/shared-modules/helpers';
import { ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { List } from './pages/list';
import { AddModalService } from './components/add-modal';
import { ChangeModalService } from './components/change-modal';
import { Details } from './pages/details';

@NgModule({
  imports: [Router, CommonModule, HelpersModule, ReactiveFormsModule, CalendarModule],
  declarations : [ Controller, List, AddModalService, ChangeModalService, Details ],
  exports      : [ Controller ],
})

export class ClientsModule { }
