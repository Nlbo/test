import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

import { BaseComponent } from '@helpers/base.component';
import { ServiceCategoryModel } from '@api/serviceCategory/models/service-category';
import { ServicesService } from '@api/services';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SelectModel } from '@models/select';
import { RoomService } from '@api/room';

@Component({
  selector: 'edit-model-service',
  templateUrl: './index.html',
  styleUrls: ['./index.scss'],
})

export class EditModalService extends BaseComponent implements OnInit {

  list: ServiceCategoryModel[] = [];

  @Output('close') close = new EventEmitter();
  @Output('send') send = new EventEmitter();
  @Input('id') id;

  @ViewChild('maxCount', {static: false}) maxCountSelect;
  @ViewChild('roomList', {static: false}) roomListSelect;
  @ViewChild('durationList', {static: false}) durationListSelect;

  form: FormGroup;
  public timeList: SelectModel[] = [];
  public maxCount: SelectModel[] = [];
  public roomsList: SelectModel[] = [];
  public durationList: SelectModel[] = [];
  public roomFlag = false;
  public timeFlag = false;

  constructor(
    private service: ServicesService,
    private roomService: RoomService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(''),
      fixedPrice: new FormControl(true),
      fixedDuration: new FormControl(true),
      roomId: new FormControl(0),
      fromDuration: new FormControl(null),
      toDuration: new FormControl(null),
      fromPrice: new FormControl(null),
      toPrice: new FormControl(null),
      time: new FormControl(''),
      maxCount: new FormControl(''),
      branchList: new FormControl([localStorage.getItem('branch')]),
    });

    this.timeList = this.service.timeList;
    this.maxCount = this.service.maxCount;
    this.durationList = this.service.durationList;
    this.roomService.getRoomsList(0, 9999999).subscribe((data) => {
      this.roomsList = data.list.map(x => new SelectModel(x.name, x.id));
      console.log(this.roomsList);
    });

    this.service.getService(this.id).subscribe((data: any) => {
      this.form.get('name').setValue(data.data.name);
      this.form.get('fixedPrice').setValue(data.data.fixedPrice);
      this.form.get('fixedDuration').setValue(data.data.fixedDuration);
      this.form.get('roomId').setValue(data.data.roomId);
      this.form.get('fromDuration').setValue(data.data.fromDuration);
      this.form.get('toDuration').setValue(data.data.toDuration);
      this.form.get('fromPrice').setValue(data.data.fromPrice);
      this.form.get('toPrice').setValue(data.data.toPrice);
      this.form.get('maxCount').setValue(data.data.maxCount);

      this.roomFlag = Boolean(data.data.roomId);
      this.timeFlag = Boolean(data.data.time);

    });


  }

  setForm() {

  }

  validateAll() {
    if (this.roomFlag) {
      this.form.get('roomId').markAsTouched();
      this.form.get('roomId').setValidators([Validators.required]);
      this.form.get('roomId').updateValueAndValidity();
    } else {
      this.form.get('roomId').clearValidators();
      this.form.get('roomId').updateValueAndValidity();
    }
    if (this.timeFlag) {
      this.form.get('time').markAsTouched();
      this.form.get('time').setValidators([Validators.required]);
      this.form.get('time').updateValueAndValidity();
    } else {
      this.form.get('time').clearValidators();
      this.form.get('time').updateValueAndValidity();
    }
  }

  foo() {
    this.validateAll();
    if (this.form.valid) {
      this.service.changeService( this.id, this.form.value)
        .subscribe((data) => {
          console.log(data);
          this.send.emit();
        });
    }
  }

  changeItem(event, item) {
    switch (item) {
      case 'room': {
        return this.form.get('roomId').setValue(event);
      }
      case 'maxCount': {
        return this.form.get('maxCount').setValue(event);
      }
    }
  }
}
