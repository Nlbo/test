import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Controller } from '../controller';
import { BranchesComponent } from '@modules/settings/pages/branches';

const ROUTES: Routes = [
  {
    path      : '',
    component : Controller,
    children  : [
      {
        path         : 'branches',
        component: BranchesComponent,

      },
      {
        path: '**',
        redirectTo: 'branches',
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
