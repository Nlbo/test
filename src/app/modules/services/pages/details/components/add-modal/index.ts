import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';

import { BaseComponent } from '@helpers/base.component';
import { ServiceCategoryModel } from '@api/serviceCategory/models/service-category';
import { ServicesService } from '@api/services';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SelectModel } from '@models/select';
import { RoomService } from '@api/room';

@Component({
  selector: 'add-model-service',
  templateUrl: './index.html',
  styleUrls: ['./index.scss'],
})

export class AddModalService extends BaseComponent implements OnInit {

  list: ServiceCategoryModel[] = [];

  @Output('close') close = new EventEmitter();
  @Output('send') send = new EventEmitter();
  @Input('id') id;

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
      name: new FormControl('', [Validators.required]),
      fixedPrice: new FormControl(true),
      fixedDuration: new FormControl(true),
      roomId: new FormControl(0),
      fromDuration: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(1)]),
      toDuration: new FormControl(null),
      fromPrice: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(1)]),
      toPrice: new FormControl(null),
      maxCount: new FormControl('', [Validators.required]),
      time: new FormControl(''),
      branchList: new FormControl([localStorage.getItem('branch')]),
    });

    this.form.get('fixedPrice').valueChanges.subscribe((data) => {
      if(!data) {
        this.form.get('toPrice').setValidators([Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(2)]);
        this.form.get('toPrice').updateValueAndValidity();
      } else {
        this.form.get('toPrice').clearValidators();
        this.form.get('toPrice').updateValueAndValidity();
      }
    });

    this.form.get('fixedDuration').valueChanges.subscribe((data) => {
      if(!data) {
        this.form.get('toDuration').setValidators([Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(1)]);
        this.form.get('toDuration').updateValueAndValidity();
      } else {
        this.form.get('toDuration').clearValidators();
        this.form.get('toDuration').updateValueAndValidity();
      }
    });

    this.timeList = this.service.timeList;
    this.durationList = this.service.durationList;
    this.maxCount = this.service.maxCount;
    this.roomService.getRoomsList(0, 9999999).subscribe((data) => {
      this.roomsList = data.list.map(x => new SelectModel(x.name, x.id));
      console.log(this.roomsList);
    });

  }


  validateAll() {
    if (this.roomFlag) {
      this.form.get('roomId').markAsTouched();
      this.form.get('roomId').setValidators([Validators.required]);
      this.form.get('roomId').updateValueAndValidity();
    }
    if (this.timeFlag) {
      this.form.get('time').markAsTouched();
      this.form.get('time').setValidators([Validators.required]);
      this.form.get('time').updateValueAndValidity();
    }
  }

  foo() {
    this.validateAll();
    if (this.form.valid) {
      this.service.addService(this.form.value, this.id)
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
      case 'time': {
        return this.form.get('time').setValue(event);
      }
    }
  }
}
