import { Component, OnInit } from '@angular/core';

import { BaseComponent } from '@platform/helpers/base.component';
import { ServicesCategoryService } from '@api/serviceCategory';
import { ActivatedRoute } from '@angular/router';
import { merge, Observable, Subject } from 'rxjs';
import { ServiceCategoryModel } from '@api/serviceCategory/models/service-category';
import { ToasterService } from '@platform/modules/toaster/services/toaster.service';
import { ToasterEnum } from '@platform/modules/toaster/enums/toaster-type.enum';

@Component({
  templateUrl: './index.html',
  styleUrls: ['./index.scss'],
})

export class ServicesList extends BaseComponent implements OnInit {
  deleteFlagModal: boolean = false;
  public paramsByLoad$: Observable<any>;
  public subject = new Subject();

  deleteCandidate;
  editCandidate;
  addModalFlag: boolean = false;
  list: ServiceCategoryModel[] = [];
  newCategoryServiceName = '';
  editModalFlag: boolean = false;
  editCategoryServiceName = '';

  constructor(
    private service: ServicesCategoryService,
    private activatedRoute: ActivatedRoute,
    private toasterService: ToasterService,

  ) {
    super();
  }

  ngOnInit(): void {
    this.paramsByLoad$ = merge(this.activatedRoute.params, this.subject);
  }

  public itemsChanged(data: ServiceCategoryModel[]): void {
    this.list = data;
    console.log('########', data);
  }

  public getList = (page: number) => {
    return this.service.getServiceCategoryList(page);
  };

  showAddModal() {
    this.addModalFlag = !this.addModalFlag;
  }

  addCategoryService() {
    if(this.newCategoryServiceName) {
      this.service.addServiceCategory(this.newCategoryServiceName)
        .subscribe((data) => {
          this.subject.next({});
          this.showAddModal();
        })
    } else {
      this.toasterService.showNotification('Please enter the name ...', ToasterEnum.Error);
    }
  }

  showDeleteModal(candidate = '') {
    this.deleteCandidate = candidate;
    this.deleteFlagModal = !this.deleteFlagModal;
  }
  showEditModal(candidate: any = '') {
    this.editCandidate = candidate;
    this.editCategoryServiceName = candidate.name;
    this.editModalFlag = !this.editModalFlag;
  }

  editCategoryService() {
    const data = this.editCandidate;
    data.branchList = [localStorage.getItem('branch')];
      data.name = this.editCategoryServiceName;
    this.service.changeServiceCategory(this.editCandidate.id, data)
      .subscribe((res) => {
        this.subject.next({});

        this.showEditModal();
      });
  }
  removeBranch() {
    this.service.deleteServiceCategory(this.deleteCandidate.id)
      .subscribe((data) => {
        this.subject.next({});

        this.showDeleteModal();
      });
  }
}
