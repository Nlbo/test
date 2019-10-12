import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Controller } from '../controller';
import { ServicesList } from '@modules/services/pages/list';
import { ServicesListDetails } from '@modules/services/pages/details/controller';

const ROUTES: Routes = [
  {
    path      : '',
    component : Controller,
    children: [
      {path: 'list', component: ServicesList},
      {path: 'details/:id', component: ServicesListDetails},
      {path: '', redirectTo: 'list', pathMatch: 'full'},
    ],
  },
  {path: '**', redirectTo: 'list', pathMatch: 'full'},
];

@NgModule({
  imports : [ RouterModule.forChild(ROUTES) ],
  exports : [ RouterModule ],
})

export class Router { }
