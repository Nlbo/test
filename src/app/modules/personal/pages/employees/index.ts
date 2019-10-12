import { Component, OnInit } from '@angular/core';
import { EmployeesService } from '@api/employees';
import { FormControl, FormGroup } from '@angular/forms';
import { merge, Observable, Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { debounceTime } from 'rxjs/operators';

@Component({
  templateUrl: './index.html',
  styleUrls: ['./index.scss'],
})

export class EmployeessComponent implements OnInit {
  deleteFlagModal: boolean = false;
  addModalFlag: boolean = false;
  list: any[] = [];
  newCategoryServiceName = '';
  deleteCandidate;
  editModalFlag: boolean = false;
  editemployeesName = '';
  editCandidate;
  searchText = '';
  searchTextf = new FormControl('');
  form: FormGroup;

  public paramsByLoad$: Observable<any>;
  public subject = new Subject();

  constructor(
    private service: EmployeesService,
    private activatedRoute: ActivatedRoute,
  ) {
  }

  search() {
    this.subject.next({});
  }

  ngOnInit(): void {
    this.paramsByLoad$ = merge(this.activatedRoute.params, this.subject, this.searchTextf.valueChanges.pipe(debounceTime(500)));
    this.form = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      branchList: new FormControl(''),
      phoneNumber: new FormControl(''),
      email: new FormControl(''),
      positionId: new FormControl(''),
      dateOfBirth: new FormControl(''),
      dateOfReceipt: new FormControl(''),

    });
  }

  errImageLoad(event) {
    event.target.src = '/assets/defaults/person.png';
  }

  public itemsChanged(data: any[]): void {
    this.list = data;
  }

  public getList = (page: number) => {
    return this.service.getEmployeesList(page, 5, this.searchTextf.value);
  };

  showAddModal() {
    this.addModalFlag = !this.addModalFlag;
  }

  addCategoryService() {
    console.log(this.form.value);
    // this.serviceCategory.addEmployees(this.newCategoryServiceName)
    //   .subscribe((data) => {
    // this.subject.next();
    //     this.showAddModal();
    //   });
  }

  showDeleteModal(candidate = '') {
    this.deleteCandidate = candidate;
    this.deleteFlagModal = !this.deleteFlagModal;
  }

  showEditModal(candidate: any = '') {
    this.editCandidate = candidate;
    this.editemployeesName = candidate.name;
    this.editModalFlag = !this.editModalFlag;
  }

  editBrancheService() {
    const data = this.editCandidate;
    data.name = this.editemployeesName;
    this.service.changeEmployees(this.editCandidate.id, data)
      .subscribe((res) => {
        this.subject.next({});


        this.showEditModal();
      });
  }

  removeemployees() {
    this.service.deleteEmployees(this.deleteCandidate.id)
      .subscribe((data) => {
        this.subject.next({});

        this.showDeleteModal();
      });
  }
}
