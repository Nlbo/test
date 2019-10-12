import { NgModule }     from '@angular/core';
import { CommonModule } from '@angular/common';

import { Controller } from './controller';
import { Router }     from './route';

import { HelpersModule } from '@shared/helpers';
import { PositionsComponent } from '@modules/personal/pages/position';
import { RoomsComponent } from '@modules/personal/pages/rooms';
import { EmployeessComponent } from '@modules/personal/pages/employees';
import { ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';

@NgModule({
  imports: [Router, CommonModule, HelpersModule, ReactiveFormsModule, CalendarModule],
  declarations : [ Controller, PositionsComponent, RoomsComponent, EmployeessComponent ],
  exports      : [ Controller ],
})

export class PersonalModule { }
