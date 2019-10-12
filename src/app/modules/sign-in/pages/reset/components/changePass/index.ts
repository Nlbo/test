import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterService } from '@platform/modules/toaster/services/toaster.service';
import { ForgetService } from '@api/forget';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-change-pass',
  templateUrl: './index.html',
  styleUrls: ['./index.scss'],
})

export class ChangePass implements OnInit {
  @Input() code: string;
  @Input() email: string;
  password = new FormControl('');
  checkPassword = new FormControl('');
  flag: boolean = false;

  constructor(
    private router: Router,
    private toasterService: ToasterService,
    private forgetService: ForgetService,
  ) {
  }

  ngOnInit() {

  }

  auth() {
    if (this.password.value === this.checkPassword.value) {
      this.flag = !this.flag;
      const data = {
        code: this.code,
        email: this.email,
        password: this.password.value,
      };
      this.forgetService.changePassword(data)
        .subscribe((res) => {
          this.flag = !this.flag;
          this.router.navigate(['../login']);
        }, err => this.flag = !this.flag);
    }
  }

  // #endregion
}
