import { NgModule }     from '@angular/core';
import { CommonModule } from '@angular/common';

import { Controller } from './controller';
import { Router }     from './route';

import { HelpersModule } from '@shared/helpers';
import { ServicesList } from '@modules/services/pages/list';
import { ServicesListDetails } from '@modules/services/pages/details/controller';
import { ReactiveFormsModule } from '@angular/forms';
import { AddModalService } from '@modules/services/pages/details/components/add-modal';
import { EditModalService } from '@modules/services/pages/details/components/edit-modal';

@NgModule({
  imports: [Router, CommonModule, HelpersModule, ReactiveFormsModule],
  declarations : [ Controller, ServicesList, ServicesListDetails, AddModalService, EditModalService ],
  exports      : [ Controller ],
})

export class ServicesModule { }
