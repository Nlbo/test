import { Component, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-toolbar-btn',
  templateUrl: './index.html',
  styleUrls: ['./index.scss'],
})
export class Toolbar {
  @Output() evChange: EventEmitter<any> = new EventEmitter();
  @Input() set isOpened(data: boolean) {
    if (data) {
      this.isOpen = true;
    } else {
      this.close();
    }
  }

  @Input() id: number;
  @Input() rotate: boolean;
  public isOpen: boolean;

  public changeIsOpenState = (): void => {
    this.isOpen = !this.isOpen;
    this.evChange.emit(this.id);
  }

  public close = () => {
    this.isOpen = false;
  }
}
