import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { BaseComponent } from '@helpers/base.component';
import { RoomService } from '@api/room';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GroupsService } from '@api/customerGroup';
import { SelectModel } from '@models/select';
import { GroupTypes } from '@enums/groupTypes';
import { ToasterService } from '@platform/modules/toaster/services/toaster.service';
import { ToasterEnum } from '@platform/modules/toaster/enums/toaster-type.enum';

@Component({
  selector: 'add-model-group',
  templateUrl: './index.html',
  styleUrls: ['./index.scss'],
})

export class AddModalGroup extends BaseComponent implements OnInit {

  @Output('close') close = new EventEmitter();
  @Output('send') send = new EventEmitter();
  @Input('id') id;


  public groupsList: SelectModel[] = [];
  public groupTypeEnum = GroupTypes;

  form: FormGroup;

  constructor(
    private service: GroupsService,
    private roomService: RoomService,
    private groupsService: GroupsService,
    private toasterService: ToasterService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      groupType: new FormControl(this.groupTypeEnum.WithCount),
      discount: new FormControl('', [Validators.pattern('^[0-9]*$')]),
    });

    this.groupsService.getGroupsList(0, 9999).subscribe((data) => {
      this.groupsList = data.list.map(x => new SelectModel(x.name, x.id));
    });
  }

  foo() {
    if(this.form.valid) {
      this.service.addGroup(this.form.value).subscribe((data) => {
        this.send.emit();
      });
    } else {
      this.toasterService.showNotification('Invalid form', ToasterEnum.Error);
    }
  }

  changeItem(event) {
    this.form.get('groupId').setValue(event);
  }

}
