import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Controller } from '../controller';
import { PositionsComponent } from '@modules/personal/pages/position';
import { RoomsComponent } from '@modules/personal/pages/rooms';
import { EmployeessComponent } from '@modules/personal/pages/employees';

const ROUTES: Routes = [
  {
    path      : '',
    component : Controller,
    children  : [
      {
        path         : 'position',
        component: PositionsComponent,

      },
      {
        path         : 'employees',
        component: EmployeessComponent,
      },
      {
        path         : 'rooms',
        component: RoomsComponent,
      },
      {
        path         : 'salaries',
        component: RoomsComponent,
      },
      {
        path         : 'schedule',
        component: RoomsComponent,
      },
      {
        path: '',
        redirectTo: 'position',
        pathMatch: 'full',
      },
      {
        path: '**',
        redirectTo: 'position',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports : [ RouterModule.forChild(ROUTES) ],
  exports : [ RouterModule ],
})

export class Router { }
