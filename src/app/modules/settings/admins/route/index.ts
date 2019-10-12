import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Controller } from '../controller';
// import { List }       from '../pages/list';
// import { Details }    from '../pages/details';

const ROUTES: Routes = [
  {
    path      : '',
    component : Controller,
    children  : [
      // {
      //   path      : 'list',
      //   component : List,
      // },
      {
        path       : '**',
        pathMatch  : 'full',
        // redirectTo : 'list',
      },
    ],
  },
];

@NgModule({
  imports   : [ RouterModule.forChild(ROUTES) ],
  exports   : [ RouterModule ],
})

export class Router { }
