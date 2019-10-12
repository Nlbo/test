import { Component, OnInit } from '@angular/core';
import { BranchesService } from '@api/branches';
import { merge, Observable, Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ServiceCategoryModel } from '@api/serviceCategory/models/service-category';

@Component({
  templateUrl: './index.html',
  styleUrls: ['./index.scss'],
})

export class BranchesComponent implements OnInit {
  addModalFlag: boolean = false;
  deleteFlagModal: boolean = false;
  public paramsByLoad$: Observable<any>;
  public subject = new Subject();


  deleteCandidate;
  editCandidate;
  list: any[] = [];
  newCategoryServiceName = '';
  editModalFlag: boolean = false;
  editBranchName = '';

  constructor(
    private service: BranchesService,
    private activatedRoute: ActivatedRoute,

  ) {
  }

  ngOnInit(): void {
    this.paramsByLoad$ = merge(this.activatedRoute.params, this.subject);
  }

  public itemsChanged(data: any[]): void {
    this.list = data;
  }

  public getList = (page: number) => {
    return this.service.getBranchesList(page);
  };


  showAddModal() {
    this.addModalFlag = !this.addModalFlag;
  }

  addCategoryService() {
    this.service.addBranch(this.newCategoryServiceName)
      .subscribe((data) => {
        this.subject.next({});

        this.showAddModal();
      })
  }

  showDeleteModal(candidate = '') {
    this.deleteCandidate = candidate;
    this.deleteFlagModal = !this.deleteFlagModal;
  }

  showEditModal(candidate: any = '') {
    this.editCandidate = candidate;
    this.editBranchName = candidate.name;
    this.editModalFlag = !this.editModalFlag;
  }

  editBrancheService() {
    const data = this.editCandidate;
    data.name = this.editBranchName;
    this.service.changeBranch(this.editCandidate.id, data)
      .subscribe((res) => {
        this.subject.next({});


        this.showEditModal();
      });
  }

  removeBranch() {
    this.service.deleteBranch(this.deleteCandidate.id)
      .subscribe((data) => {
        this.subject.next({});
;

        this.showDeleteModal();
      });
  }
}
