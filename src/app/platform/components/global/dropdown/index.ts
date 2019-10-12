import { Component, Input, Output, EventEmitter } from '@angular/core';

import { SelectModel } from '@platform/models/select';

@Component({
  selector    : 'select-dropdown',
  templateUrl : './index.html',
  styleUrls   : ['./index.scss'],
})

export class Dropdown {
  @Output() evChange: EventEmitter<any> = new EventEmitter();
  @Output() remove: EventEmitter<any> = new EventEmitter();
  @Input() list: SelectModel[] = [];
  @Input() disabledItems: any[] = [];
  @Input() disable: boolean;
  @Input() multiple: boolean;
  @Input() multipleViewByName: boolean;
  @Input() removeBtn: boolean;
  @Input() error: boolean;
  @Input() disableBorder: boolean;
  @Input() placeholder: string = '';
  @Input() get values(): any[] { return this._selectedItems || []; }
  @Input() get value(): any {
    return this._selectedValue;
  }

  private _selectedValue: any;
  private _selectedItems: any[];
  public isOpen: boolean;

  constructor() {}

  get selectedItem(): SelectModel {
    return this.list.find(item => JSON.stringify(item.value) === JSON.stringify(this.value)) || null;
  }

  get title(): string {

    if (!this.multiple) {
      if (this.selectedItem) return this.selectedItem.name;
      return this.placeholder;

    } else {

      if (!(this._selectedItems && this._selectedItems.length)) return this.placeholder;
      if (!this.multipleViewByName || this._selectedItems.length > 4) return this._selectedItems.length + ' Selected';

      let title: string = '';

      this.list.forEach(item => {
        if (this.isSelected(item)) title += `${item.name}, `;
      });

      title = title.slice(0, title.length - 2);

      return title;
    }

  }

  set value(val: any) {
    this.close();
    this._selectedValue = val;
    this.evChange.emit(this._selectedValue);
  }

  set values(val: any[]) {
    if (val) {
      this._selectedItems = val;
      this.evChange.emit(this._selectedItems);
    }
  }

  public change = (item: SelectModel): void => {
    if (!this.multiple) {
      if (!this.isDisabled(item)) this.value = item.value;
    } else {
      if (!this.isSelected(item)) {
        this.values = [...this.values, item.value];
      } else {
        this.values = this.values.filter(el => JSON.stringify(el) !== JSON.stringify(item.value));
      }
    }
  }

  public removeItem = (event: Event, id: number): void => {
    event.stopPropagation();
    this.remove.emit(id);
    this.list = this.list.filter(item => JSON.stringify(item.id) !== JSON.stringify(id));
  }

  public toggle = (): void => {
    if (!this.disable) {
      if (this.list.length) {
        this.isOpen = !this.isOpen;
      }
    }
  }
  public close = (): void => {
    if (this.isOpen) this.isOpen = false;
  }

  public isSelected = (item: SelectModel): boolean => {
    if (!this.multiple) {
      return item.value === this.value;
    } else {
      return this.values.find(x => JSON.stringify(x) === JSON.stringify(item.value));
    }
  }

  public isDisabled = (item: SelectModel): boolean => {
    let flag: boolean;
    this.disabledItems.forEach(el => {
      if (item.value === el) flag = true;
    });
    return flag;
  }
}
