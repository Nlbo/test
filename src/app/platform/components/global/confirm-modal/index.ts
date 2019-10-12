import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector    : 'confirm-modal',
  templateUrl : './index.html',
  styleUrls   : ['./index.scss'],
})
export class ConfirmModal {
  @Input() text: string = 'Are you sure you want to delete?';
  @Output() close: EventEmitter<undefined> = new EventEmitter();
  @Output() confirm: EventEmitter<undefined> = new EventEmitter();
}
