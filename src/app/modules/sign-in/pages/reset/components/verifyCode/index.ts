import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterService } from '@platform/modules/toaster/services/toaster.service';
import { ForgetService } from '@api/forget';

@Component({
  selector: 'app-verify-code',
  templateUrl: './index.html',
  styleUrls: ['./index.scss'],
})

export class VerifyCode implements OnInit {
  @Output() setCode = new EventEmitter();
  @Input() email: string;
  code: string = '';
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
    if (this.code) {
      this.flag = !this.flag;
      const data = {
        email: this.email,
        code: this.code,
      };
      this.forgetService.verifyCode(data)
        .subscribe((res) => {
          this.setCode.emit(this.code);
        }, err => this.flag = !this.flag);
    }
  }

  // #endregion
}
