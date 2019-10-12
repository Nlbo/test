import { Component, OnInit } from '@angular/core';
import { merge, Observable, Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { CustomerService } from '@api/customer';
import { debounceTime } from 'rxjs/operators';

@Component({
  templateUrl: './index.html',
  styleUrls: ['./index.scss'],
})

export class ClientsDetailsComponent implements OnInit {

  public paramsByLoad$: Observable<any>;
  public subject = new Subject();

  deleteFlagModal: boolean = false;
  addModalFlag: boolean = false;
  list: any[] = [];
  newCategoryServiceName = '';
  deleteCandidate;
  editModalFlag: boolean = false;
  editclientsName = '';
  searchText = new FormControl('');
  editCandidate;

  constructor(
    private activatedRoute: ActivatedRoute,
    private service: CustomerService) {
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
    return this.service.getCustomersList(page, 5, this.searchText.value);
  };

  showAddModal() {
    this.addModalFlag = !this.addModalFlag;
  }

  send() {
    this.addModalFlag = !this.addModalFlag;
    this.subject.next({});
  }

  addCategoryService() {
    this.service.addCustomer(this.newCategoryServiceName)
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
    this.editclientsName = candidate.name;
    this.editModalFlag = !this.editModalFlag;
  }

  editBrancheService() {
    const data = this.editCandidate;
    data.name = this.editclientsName;
    this.service.changeCustomer(this.editCandidate.id, data)
      .subscribe((res) => {
        this.subject.next({});


        this.showEditModal();
      });
  }

  sendShowEditModal(flag) {
    this.editModalFlag = !this.editModalFlag;
    if(flag) this.subject.next({});
  }

  removeclients() {
    this.service.deleteCustomer(this.deleteCandidate.id)
      .subscribe((data) => {
        this.subject.next({});

        this.showDeleteModal();
      });
  }

}
