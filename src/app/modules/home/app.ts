import { NgModule }     from '@angular/core';
import { CommonModule } from '@angular/common';

import { Controller } from './controller';
import { Router }     from './route';

import { HelpersModule } from '@shared/helpers';

@NgModule({
  imports      : [ Router, CommonModule, HelpersModule ],
  declarations : [ Controller ],
  exports      : [ Controller ],
})

export class HomeModule { }
