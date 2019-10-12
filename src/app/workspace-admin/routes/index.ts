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
        loadChildren : () => import('@modules/schedule/app').then(m => m.ScheduleModule),
        canActivate  : [ AdminGuard ],
      },
      {
        path         : 'clients',
        loadChildren : () => import('@modules/clients/clients/app').then(m => m.ClientsModule),
        canActivate  : [ AdminGuard ],
      },
      {
        path         : 'groups',
        loadChildren : () => import('@modules/clients/groups/app').then(m => m.GroupsModule),
        canActivate  : [ AdminGuard ],
      },
      {
        path         : 'employees',
        loadChildren : () => import('@modules/personal/employees/app').then(m => m.EmployeesModule),
        canActivate  : [ AdminGuard ],
      },
      {
        path         : 'position',
        loadChildren : () => import('@modules/personal/position/app').then(m => m.PositionModule),
        canActivate  : [ AdminGuard ],
      },
      {
        path         : 'rooms',
        loadChildren : () => import('@modules/personal/rooms/app').then(m => m.RoomsModule),
        canActivate  : [ AdminGuard ],
      },
      {
        path         : 'salaries',
        loadChildren : () => import('@modules/personal/salaries/app').then(m => m.SalariesModule),
        canActivate  : [ AdminGuard ],
      },
      {
        path         : 'schedule',
        loadChildren : () => import('@modules/personal/schedule/app').then(m => m.ScheduleModule),
        canActivate  : [ AdminGuard ],
      },
      {
        path         : 'services',
        loadChildren : () => import('@modules/services/app').then(m => m.ServicesModule),
        canActivate  : [ AdminGuard ],
      },
      {
        path         : 'branches',
        loadChildren : () => import('@modules/settings/branches/app').then(m => m.SettingsModule),
        canActivate  : [ AdminGuard ],
      },
      {
        path         : 'admins',
        loadChildren : () => import('@modules/settings/admins/app').then(m => m.AdminsModule),
        canActivate  : [ AdminGuard ],
      },
      {
        path         : 'incoming-costs',
        loadChildren : () => import('@modules/finance/incoming-costs/app').then(m => m.IncomingCostsModule),
        canActivate  : [ AdminGuard ],
      },
      {
        path         : 'employee-report',
        loadChildren : () => import('@modules/finance/employee-report/app').then(m => m.EmployeeReport),
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
