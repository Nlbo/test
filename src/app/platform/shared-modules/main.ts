
/* Angular platform services */

import { NgModule }     from '@angular/core';
import { FormsModule }  from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

/* Angular platform services end */

/* Components */

import { Sidebar } from '@platform/components/global/sidebar';
import { Header }  from '@platform/components/global/header';

/* Components end */

import { HelpersModule } from './helpers';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    HelpersModule,
  ],
  declarations: [
    Sidebar,
    Header,
  ],
  exports: [
    Sidebar,
    Header,
  ],
})

export class MainSharedModule {}
