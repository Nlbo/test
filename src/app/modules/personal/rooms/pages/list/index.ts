import { Component, OnInit } from '@angular/core';
import { RoomService } from '@api/room';
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
  editroomsName = '';
  editCandidate;

  public paramsByLoad$: Observable<any>;
  public subject = new Subject();

  constructor(
    private service: RoomService,
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
    return this.service.getRoomsList(page, 5);
  }

  showAddModal() {
    this.addModalFlag = !this.addModalFlag;
  }

  addCategoryService() {
    this.service.addBRoom(this.newCategoryServiceName)
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
    this.editroomsName = candidate.name;
    this.editModalFlag = !this.editModalFlag;
  }

  editBrancheService() {
    const data = this.editCandidate;
    data.name = this.editroomsName;
    this.service.changeRoom(this.editCandidate.id, data)
      .subscribe((res) => {
        this.subject.next({});

        this.showEditModal();
      });
  }

  removerooms() {
    this.service.deleteRoom(this.deleteCandidate.id)
      .subscribe((data) => {
        this.subject.next({});

        this.showDeleteModal();
      });
  }
}
