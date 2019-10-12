
/* Angular platform services */

import { NgModule }     from '@angular/core';
import { FormsModule }  from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

/* Angular platform services end */

/* Directives */

import { BgImageDirective }        from '@directives/bg-image';
import { RouteToDirective }        from '@directives/routes';
import { CheckboxDirective }       from '@directives/checkbox';
import { RadioDirective }          from '@directives/radio';
import { InfinityScrollDirective } from '@directives/infinity-scroll';

/* Directives end */

/* Components */

import { ClickOutSide }   from '@platform/components/global/click-outside';
import { Modal }          from '@platform/components/global/modal';
import { ConfirmModal }   from '@platform/components/global/confirm-modal';
import { Pagination }     from '@platform/components/global/pagination';
import { Dropdown }       from '@platform/components/global/dropdown';
import { ToolbarContext } from '@platform/components/global/context-menu';
import { MultiFileUpload } from '@platform/components/global/multi-file-upload';
import { TitleWrap } from '@platform/components/global/title-wrap';

/* Components end */

/* Pipe */
import { TruncatePipe } from '@pipes/truncate';
import { LoaderModule } from '@platform/modules/loader/loader.module';
import { ButtonComponent } from '@platform/components/global/button';
import { Toolbar } from '@platform/components/global/toolbar';
/* Pipe end */

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    LoaderModule,
  ],
  declarations: [
    BgImageDirective,
    RouteToDirective,
    CheckboxDirective,
    RadioDirective,
    InfinityScrollDirective,
    MultiFileUpload,
    TruncatePipe,

    TitleWrap,
    ClickOutSide,
    Modal,
    ConfirmModal,
    Pagination,
    Dropdown,
    ToolbarContext,
    ButtonComponent,
    Toolbar,
  ],
  exports: [
    CommonModule,
    FormsModule,
    LoaderModule,
    BgImageDirective,
    RouteToDirective,
    CheckboxDirective,
    RadioDirective,
    InfinityScrollDirective,
    MultiFileUpload,

    TruncatePipe,

    TitleWrap,
    ClickOutSide,
    Modal,
    ConfirmModal,
    Pagination,
    Dropdown,
    ToolbarContext,
    ButtonComponent,
    Toolbar,
  ],
})

export class HelpersModule {}
