import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Controller } from '../controller';

const ROUTES: Routes = [
  {
    path      : '',
    component : Controller,
    children  : [

      {
        path: '',
        redirectTo: 'services',
        pathMatch: 'full',
      },
      {
        path: '**',
        redirectTo: 'services',
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
