import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Controller } from '../controller';

const ROUTES: Routes = [
  {
    path      : '',
    component : Controller,
  },
];

@NgModule({
  imports : [ RouterModule.forChild(ROUTES) ],
  exports : [ RouterModule ],
})

export class Router { }
