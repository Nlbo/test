import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './index.html',
  styleUrls: ['./index.scss'],
})

export class ResetComponent implements OnInit {
  step = 1;
  code = '';
  email = '';
  constructor() {
  }

  ngOnInit() {

  }
  setCode(code) {
    this.code = code;
    this.step++;
  }

  setEmail(email) {
    this.email = email;
    this.step++;
  }
  // #endregion
}
