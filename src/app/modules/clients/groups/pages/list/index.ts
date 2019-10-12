import { Component, OnInit } from '@angular/core';
import { GroupsService } from '@api/customerGroup';
import { merge, Observable, Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  templateUrl: './index.html',
  styleUrls: ['./index.scss'],
})

export class List implements OnInit {

  deleteFlagModal: boolean = false;
  addModalFlag: boolean = false;
  list: any[] = [];
  newCategoryServiceName = '';
  deleteCandidate;
  editModalFlag: boolean = false;
  editgroupsName = '';
  searchText = new FormControl('');
  editCandidate;
  public paramsByLoad$: Observable<any>;
  public subject = new Subject();

  constructor(private service: GroupsService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.paramsByLoad$ = merge(this.activatedRoute.params, this.subject, this.searchText.valueChanges.pipe(debounceTime(500)));

  }

  search() {
    this.subject.next({});
  }

  public itemsChanged(data: any[]): void {
    this.list = data;
  }

  public getList = (page: number) => {
    return this.service.getGroupsList(page, 5, this.searchText.value);
  }

  showAddModal(flag = '') {
    this.addModalFlag = !this.addModalFlag;
    if (flag) this.subject.next({});
  }

  addCategoryService() {
    this.service.addGroup(this.newCategoryServiceName)
      .subscribe((data) => {
        this.subject.next({});

        this.showAddModal();
      });
  }

  showDeleteModal(candidate = '') {
    this.deleteCandidate = candidate;
    this.deleteFlagModal = !this.deleteFlagModal;
  }

  showEditModal(candidate: any = '') {
    this.editCandidate = candidate;
    this.editgroupsName = candidate.name;
    this.editModalFlag = !this.editModalFlag;
  }

  sendShowEditModal() {
    this.editModalFlag = !this.editModalFlag;
    this.subject.next({});
  }

  editBrancheService() {
    const data = this.editCandidate;
    data.name = this.editgroupsName;
    this.service.changeGroup(this.editCandidate.id, data)
      .subscribe((res) => {
        this.subject.next({});
        this.showEditModal();
      });
  }

  removegroups() {
    this.service.deleteGroup(this.deleteCandidate.id)
      .subscribe((data) => {
        this.subject.next({});

        this.showDeleteModal();
      });
  }

}
