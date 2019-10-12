import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ForgetService } from '@api/forget';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-send-email',
  templateUrl: './index.html',
  styleUrls: ['./index.scss'],
})

export class SendEmail implements OnInit {
  @Output() changeStep = new EventEmitter();
  username = new FormControl('', [Validators.required, Validators.pattern(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]);
  flag: boolean = false;

  constructor(
    private router: Router,
    private forgetService: ForgetService,
  ) {
  }

  ngOnInit() {

  }

  auth() {
    if (this.username.valid) {
      this.flag = !this.flag;
      this.forgetService.sendEmail(this.username.value)
        .subscribe((data) => {
          this.changeStep.emit(this.username.value);
          this.flag = !this.flag;
        }, err => this.flag = !this.flag);
    }
  }

  // #endregion
}
