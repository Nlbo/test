import { Component, Input, EventEmitter, Output, HostListener } from '@angular/core';

@Component({
  selector    : 'modal-wrap',
  templateUrl : './index.html',
  styleUrls   : ['./index.scss'],
})
export class Modal {

  @Input() isOpen: boolean;
  @Input() toRight: boolean;
  @Input() small: boolean;
  @Output() close: EventEmitter<undefined> = new EventEmitter();


  @HostListener('window:keyup', ['$event'])
    keyEvent(event: KeyboardEvent) {
      if (this.isOpen && event.keyCode === 27) {
        this.close.emit();
      }
    }
}
