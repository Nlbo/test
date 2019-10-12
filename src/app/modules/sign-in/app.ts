import { NgModule }     from '@angular/core';
import { CommonModule } from '@angular/common';

import { Controller } from './controller';
import { Router }     from './route';

import { HelpersModule } from '@shared/helpers';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from '@modules/sign-in/pages/login';
import { ResetComponent } from '@modules/sign-in/pages/reset';
import { ChangePass } from '@modules/sign-in/pages/reset/components/changePass';
import { VerifyCode } from '@modules/sign-in/pages/reset/components/verifyCode';
import { SendEmail } from '@modules/sign-in/pages/reset/components/sendEmail';

@NgModule({
  imports      : [ Router, CommonModule, HelpersModule, ReactiveFormsModule ],
  declarations : [ Controller, LoginComponent, ResetComponent, ChangePass, VerifyCode, SendEmail ],
  exports      : [ Controller ],
})

export class SignInModule { }
