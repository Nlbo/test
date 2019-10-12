import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Controller } from '../controller';
import { AdminGuard } from '@guards/admin';

const routes: Routes = [
  {
		path      : '',
		component : Controller,
		children  : [
      {
    		path         : 'main',
    		loadChildren : () => import('@modules/main/app').then(m => m.MainModule),
      },
      {
        path         : 'main',
        loadChildren : () => import('@modules/main/app').then(m => m.MainModule),
        canActivate  : [ AdminGuard ],
      },
      {
        path         : 'services',
        loadChildren : () => import('@modules/services/app').then(m => m.ServicesModule),
        canActivate  : [ AdminGuard ],
      },
      {
        path         : 'settings',
        loadChildren : () => import('@modules/settings/app').then(m => m.SettingsModule),
        canActivate  : [ AdminGuard ],
      },
      {
        path         : 'personal',
        loadChildren : () => import('@modules/personal/app').then(m => m.PersonalModule),
        canActivate  : [ AdminGuard ],
      },
      {
        path         : 'clients',
        loadChildren : () => import('@modules/clients/app').then(m => m.ClientsModule),
        canActivate  : [ AdminGuard ],
      },
      {
        path: '**',
        redirectTo: 'main',
        pathMatch: 'full',
      },
    ],
	},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoutingModule { }
