import { Component, OnInit } from '@angular/core';

import { BaseComponent } from '@helpers/base.component';
import { ActivatedRoute, Params } from '@angular/router';
import { merge, Observable, Subject } from 'rxjs';
import { ServiceCategoryModel } from '@api/serviceCategory/models/service-category';
import { ServicesService } from '@api/services';
import { FormControl, FormGroup } from '@angular/forms';
import { SelectModel } from '@models/select';
import { RoomService } from '@api/room';

@Component({
  templateUrl: './index.html',
  styleUrls: ['./index.scss'],
})

export class ServicesListDetails extends BaseComponent implements OnInit {
  deleteFlagModal: boolean = false;
  public paramsByLoad$: Observable<any>;
  public subject = new Subject();
  roomsList: SelectModel[] = [];
  durationList: SelectModel[] = [];
  maxCount: SelectModel[] = [];

  deleteCandidate;
  editCandidate;
  addModalFlag: boolean = false;
  list: ServiceCategoryModel[] = [];
  newCategoryServiceName = '';
  editModalFlag: boolean = false;
  editCategoryServiceName = '';
  id: number;
  searchText = new FormControl('');
  name: '';
  form: FormGroup;

  constructor(
    private service: ServicesService,
    private roomService: RoomService,
    private activatedRoute: ActivatedRoute,
  ) {
    super();
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = params.id;
    });
    this.paramsByLoad$ = merge(this.activatedRoute.params, this.subject, this.searchText.valueChanges);
    this.form = new FormGroup({
      name: new FormControl(''),
      fixedPrice: new FormControl(false),
      fixedDuration: new FormControl(false),
    });


  this.maxCount = this.service.maxCount;
    this.roomService.getRoomsList(0, 9999999).subscribe((data) => {
      this.roomsList = data.list.map(x => new SelectModel(x.name, x.id));
      this.roomsList.unshift(new SelectModel('', 0));
    });

  }

  foo(event) {

  }

  public itemsChanged(data: ServiceCategoryModel[]): void {
    this.list = data;
  }

  public getList = (page: number, id = this.id) => {
    return this.service.getServiceList(0, 7, id, this.searchText.value);
  };

  showAddModal(flag = '') {
    this.addModalFlag = !this.addModalFlag;
    if (flag) {
      this.subject.next({})
    }
  }

  addCategoryService() {
    this.service.addService(this.newCategoryServiceName)
      .subscribe((data) => {
        this.subject.next({});
        this.showAddModal();
      });
  }

  showDeleteModal(candidate: any = '') {
    this.deleteCandidate = candidate;
    this.deleteFlagModal = !this.deleteFlagModal;
  }

  showEditModal(candidate: any = '') {
    this.editCandidate = candidate;
    this.editCategoryServiceName = candidate.name;
    this.editModalFlag = !this.editModalFlag;
  }



  editCategoryService(flag) {
    this.showEditModal();
    if(flag){
      this.subject.next({});
    }
  }

  removeBranch() {
    this.service.deleteService(this.deleteCandidate.id)
      .subscribe((data) => {
        this.subject.next({});

        this.showDeleteModal();
      });
  }
}
