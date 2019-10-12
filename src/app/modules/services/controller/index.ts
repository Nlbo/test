import { Component, OnInit } from '@angular/core';

import { BaseComponent } from '@platform/helpers/base.component';

@Component({
  templateUrl: '../view/index.html',
  styleUrls: ['../styles/index.scss'],
})

export class Controller extends BaseComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {

  }

}
