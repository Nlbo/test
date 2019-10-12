import { Component, OnInit } from '@angular/core';
import { PositionsService } from '@api/position';
import { merge, Observable, Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

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
  editPositionName = '';
  editCandidate;
  public paramsByLoad$: Observable<any>;
  public subject = new Subject();

  constructor(private service: PositionsService,  private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.paramsByLoad$ = merge(this.activatedRoute.params, this.subject);
  }

  public itemsChanged(data: any[]): void {
    this.list = data;
  }

  public getList = (page: number) => {
    return this.service.getPositionsList(page, 5);
  }

  showAddModal() {
    this.addModalFlag = !this.addModalFlag;
  }

  addCategoryService() {
    this.service.addBPosition(this.newCategoryServiceName)
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
    this.editPositionName = candidate.name;
    this.editModalFlag = !this.editModalFlag;
  }

  editBrancheService() {
    const data = this.editCandidate;
    data.branchList = [localStorage.getItem('branch')];

      data.name = this.editPositionName;
    this.service.changePosition(this.editCandidate.id, data)
      .subscribe((res) => {
        this.subject.next({});

        this.showEditModal();
      });
  }

  removePosition() {
    this.service.deletePosition(this.deleteCandidate.id)
      .subscribe((data) => {
        this.subject.next({});

        this.showDeleteModal();
      });
  }
}
