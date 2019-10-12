import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '@platform/services/auth';
import { ToasterService } from '@platform/modules/toaster/services/toaster.service';
import { LoginRM } from '@models/login-rm';
import { AppHelper } from '@helpers/index';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './index.html',
  styleUrls: ['./index.scss'],
})

export class LoginComponent implements OnInit {
  public data = new LoginRM();
  public form: FormGroup;
  flag: boolean = false;

  constructor(
    private router: Router,
    private toasterService: ToasterService,
    private authService: AuthService,
  ) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
    });
  }

  // #region API requests

  public auth() {
    if (this.form.valid) {
      this.flag = !this.flag;

      return this.authService.login(this.data)
        .subscribe((user) => {
          this.flag = !this.flag;
          this.router.navigateByUrl(AppHelper.GET_BASE_ROUTE(user.role));
        }, err => this.flag = !this.flag);
    }
  }

  // #endregion
}
