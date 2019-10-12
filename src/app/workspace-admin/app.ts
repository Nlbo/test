import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoutingModule } from './routes';
import { Controller } from './controller';

import { HelpersModule } from '@shared/helpers';
import { MainSharedModule } from '@shared/main';
import { Config } from '@models/config';
import { RoleEnum } from '@platform/enums/role';

@NgModule({
  imports: [
    CommonModule,
    RoutingModule,
    HelpersModule,
    MainSharedModule,
  ],
  declarations: [ Controller ],
  providers: [
    {
      provide: 'config',
      useValue: new Config(RoleEnum.Admin),
    },
  ],
})
export class WorkspaceAdminModule { }
