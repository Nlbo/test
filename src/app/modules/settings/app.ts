import { NgModule }     from '@angular/core';
import { CommonModule } from '@angular/common';

import { Controller } from './controller';
import { Router }     from './route';

import { HelpersModule } from '@shared/helpers';
import { BranchesComponent } from '@modules/settings/pages/branches';

@NgModule({
  imports      : [ Router, CommonModule, HelpersModule ],
  declarations : [ Controller, BranchesComponent ],
  exports      : [ Controller ],
})

export class SettingsModule { }
