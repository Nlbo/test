import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Controller } from '../controller';
import { GroupsComponent } from '@modules/clients/pages/groups';
import { GroupsListComponent } from '@modules/clients/pages/groups/pages/list';
import { GroupsDetailsComponent } from '@modules/clients/pages/groups/pages/details';
import { ClientsComponent } from '@modules/clients/pages/clients/controller';
import { ClientsListComponent } from '@modules/clients/pages/clients/pages/list';
import { ClientsDetailsComponent } from '@modules/clients/pages/clients/pages/details';

const ROUTES: Routes = [
  {
    path: '',
    component: Controller,
    children: [
      {
        path: 'clients',
        component: ClientsComponent,
        children: [
          {path: 'list', component: ClientsListComponent},
          {path: 'details/:id', component: ClientsDetailsComponent},
          {path: '**', redirectTo: 'list', pathMatch: 'full'},
        ],
      },
      {
        path: 'groups',
        component: GroupsComponent,
        children: [
          {path: 'list', component: GroupsListComponent},
          {path: 'details/:id', component: GroupsDetailsComponent},
          {path: '**', redirectTo: 'list', pathMatch: 'full'},
        ],
      },
      {
        path: '',
        redirectTo: 'clients',
        pathMatch: 'full',
      },
      {
        path: '**',
        redirectTo: 'clients',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})

export class Router {
}
