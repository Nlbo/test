import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Observable, Subject, merge } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';

import { BaseModel } from '@platform/modules/http/classes/base.model';
import { PaginationWrap } from '@platform/models/pagination-wrap';

@Component({
  selector    : 'g-pagination',
  templateUrl : './index.html',
  styleUrls   : ['./index.scss'],
})

export class Pagination {

  @Output() itemsChanged = new EventEmitter<any>();
  @Input() activePageInterval: number = 3;
  @Input() getData: (page: number) => Observable<PaginationWrap>;
  @Input() items: BaseModel[] = [];
  @Input() activePage: number = 1;
  @Input() set setParamsByLoad(value: Observable<any>) {
    if (value) {
      this.paramsByLoad$ = value;
      this.initObservables();
    }
  }

  public pageCount: number = 0;
  public items$: Observable<any>;
  private paramsByLoad$: Observable<any>;
  private pageToLoad$: Observable<any>;
  private subject$ = new Subject();

  constructor(
  ) { }

  public changeActivePageValue = () => this.subject$.next({ notReset: true });

  public checkPaginationItems = (item: number): boolean => {
    const CHECK_INTERVAL = !(item > this.activePage + this.activePageInterval) && !(item < this.activePage - this.activePageInterval);
    const CHECK_FIRST = item === 1;
    const CHECK_LAST = item === this.pageCount;
    return CHECK_INTERVAL || CHECK_FIRST || CHECK_LAST;
  }

  public createRange = (count: number): number[] => {
    const newArr = [];
    for (let i = 1; i <= count; i++) {
      newArr.push(i);
    }
    return newArr;
  }

  public prev = () => {
    this.activePage -= 1;
    this.changeActivePageValue();
  }
  public next = () => {
    this.activePage += 1;
    this.changeActivePageValue();
  }
  public changePage = (page: number) => {
    this.activePage = page;
    this.changeActivePageValue();
  }

  private initObservables(): void {
    this.pageToLoad$ = merge(this.paramsByLoad$, this.subject$)
      .pipe(
        tap((data) => this.prepareData(data)),
      );

    this.items$ = this.pageToLoad$
      .pipe(
        switchMap(_ => this.getData(this.activePage - 1)),
        tap(data => this.handleResponse(data)),
      );
  }

  private prepareData(data: any): void {
    if (!(data && data.notReset)) {
      this.activePage = 1;
    }
  }

  private handleResponse(data: PaginationWrap): void {
    this.items = data.list || [];
    this.pageCount = data.pageCount;

    this.itemsChanged.emit(this.items);
  }
}
