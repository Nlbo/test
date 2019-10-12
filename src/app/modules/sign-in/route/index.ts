import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Controller } from '../controller';
import { LoginComponent } from '@modules/sign-in/pages/login';
import { ResetComponent } from '@modules/sign-in/pages/reset';

const ROUTES: Routes = [
  {
    path      : '',
    component : Controller,
    children: [
      {path: 'login', component: LoginComponent},
      {path: 'reset', component: ResetComponent},
      {path: '**', redirectTo: 'login', pathMatch: 'full'},
    ],
  },
];

@NgModule({
  imports : [ RouterModule.forChild(ROUTES) ],
  exports : [ RouterModule ],
})

export class Router { }
