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
  selector: 'change-customer-model-group',
  templateUrl: './index.html',
  styleUrls: ['./index.scss'],
})

export class ChangeCustomerGroupModalService extends BaseComponent implements OnInit {

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
      phoneNumber: new FormControl('', [Validators.required]),
      groupId: new FormControl(''),
    });

    this.groupsService.getGroupsList(0, 9999).subscribe((data) => {
      this.groupsList = data.list.map(x => new SelectModel(x.name, x.id));
      this.groupsList.unshift(new SelectModel('Без Группы', ''));
    });

    this.service.getCustomer(this.id).subscribe((data: any) => {
      this.form.get('dateOfBirth').setValue(new Date(data.data.dateOfBirth));
      this.form.get('discount').setValue(data.data.discount);
      this.form.get('email').setValue(data.data.email);
      this.form.get('name').setValue(data.data.firstName);
      this.form.get('personalPreferences').setValue(data.data.personalPreferences);
      this.form.get('phoneNumber').setValue(data.data.phoneNumber);
      this.form.get('groupId').setValue(data.data.groupId);
    });

  }

  foo() {
    this.service.changeCustomer(this.id, this.form.value).subscribe((data) => {
      this.send.emit();
    });
  }

  changeItem(event) {
    this.form.get('groupId').setValue(event);
  }

}
