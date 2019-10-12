import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { BaseComponent } from '@helpers/base.component';
import { ServicesService } from '@api/services';
import { RoomService } from '@api/room';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GroupsService } from '@api/customerGroup';
import { SelectModel } from '@models/select';
import { ClientsService } from '@api/clients';
import { CustomerService } from '@api/customer';

@Component({
  selector: 'add-model-client',
  templateUrl: './index.html',
  styleUrls: ['./index.scss'],
})

export class AddModalService extends BaseComponent implements OnInit {

  @Output('close') close = new EventEmitter();
  @Output('send') send = new EventEmitter();
  @Input('id') id;

  public groupsList: SelectModel[] = [];

  form: FormGroup;

  constructor(
    private service: CustomerService,
    private roomService: RoomService,
    private groupsService: GroupsService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      dateOfBirth: new FormControl('', [Validators.required]),
      discount: new FormControl('', [Validators.pattern('^[0-9]*$')]),
      email: new FormControl('', [Validators.required, Validators.email]),
      name: new FormControl('', [Validators.required]),
      personalPreferences: new FormControl(''),
      phoneNumber: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
      groupId: new FormControl(''),
    });

    this.groupsService.getGroupsList(0, 9999).subscribe((data) => {
      this.groupsList = data.list.map(x => new SelectModel(x.name, x.id));
    });
  }

  foo() {
    const val = this.form.get('phoneNumber').value;
    val[0] !== '+' ? this.form.get('phoneNumber').setValue('+' + val) : null;
    this.service.addCustomer(this.form.value).subscribe((data) => {
      this.send.emit();
    });
  }

  changeItem(event) {
    this.form.get('groupId').setValue(event);
  }

}
