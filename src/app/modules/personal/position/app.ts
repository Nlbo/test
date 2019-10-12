import { NgModule }     from '@angular/core';
import { CommonModule } from '@angular/common';

import { Controller } from './controller';
import { Router }     from './route';
import { HelpersModule } from '@platform/shared-modules/helpers';
import { ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { List } from './pages/list';

@NgModule({
  imports: [Router, CommonModule, HelpersModule, ReactiveFormsModule, CalendarModule],
  declarations : [ Controller, List ],
  exports      : [ Controller ],
})

export class PositionModule { }
