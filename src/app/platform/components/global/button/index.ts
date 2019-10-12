import { Component, HostBinding, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'button[app-button]',
  templateUrl: './index.html',
  styleUrls: ['./index.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ButtonComponent implements OnInit {

    @HostBinding('class.G-btn') classButton = true;

    constructor() {
    }

    ngOnInit() {
    }
}
