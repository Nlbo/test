import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GuestGuard } from '@platform/guards/guest';
import { AdminGuard } from '@platform/guards/admin';

const routes: Routes = [
  {
    path         : 'auth',
    loadChildren : () => import('@app/modules/sign-in/app').then(m => m.SignInModule),
    canActivate  : [ GuestGuard ],
  },
  {
    path         : 'admin',
    loadChildren : () => import('@app/workspace-admin/app').then(m => m.WorkspaceAdminModule),
    canActivate  : [ AdminGuard ],
  },
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
