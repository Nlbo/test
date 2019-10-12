import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BranchesService } from '@api/branches';
import { SidebarNavigation } from '@platform/models/sidebar-nav';
import { SelectModel } from '@platform/models/select';
import { Unsubscribable } from '@platform/decorators/unsubscribable.decorator';
import { BaseComponent } from '@platform/helpers/base.component';
import { isNumber } from 'util';

@Component({
  selector: 'app-header',
  templateUrl: './index.html',
  styleUrls: ['./index.scss'],
})
export class Header extends BaseComponent implements OnInit {
  @Input() routes: SidebarNavigation[] = [];
  public notDefined: undefined;
  
  // Array
  public branchList: SelectModel[] = [];

  // Boolean
  public isFirstInit: boolean = true;

  // Number
  public branchId: number;

  constructor(
    private router: Router,
    private branchService: BranchesService,
    ) { super(); }

  ngOnInit() {
    this.routes.forEach(item => {
      if (item.children.find(child => this.router.url.includes(child.path))
      || this.router.url.includes(item.path) && !item.children.length) {
        item.exact = true;
      }
    });

    this.getBranchList();

    if (isNumber(+localStorage.getItem('branch'))) {
      this.branchId = +localStorage.getItem('branch');
    }
  }

  public onNavigateHome() {
    this.router.navigate(['/']);
    
    this.routes.forEach(item => {
      item.exact = false;

      if (item.path === '/admin/main') {
        item.exact = true;
      }
    });
  }

  public changeItemIsOpenedState = (item: SidebarNavigation): void => {
    this.isFirstInit = false;

    this.routes.forEach(element => {
      element.unSelected = false;

      if (element.exact) {
        element.exact = false;
        element.unSelected = true;
      }

      if (element.name !== item.name && element.opened) {
        element.opened = false;
      }
    });

    item.exact = true;
  }

  public changeItemIsOpenState = (item: SidebarNavigation): void => {
    this.routes.forEach(element => {
      if (element.name !== item.name && element.opened) {
        element.opened = false;
      }
    });

    item.opened = !item.opened;
  }

  @Unsubscribable()
  private getBranchList() {
    return this.branchService.getBranchesList()
      .subscribe(data => {
        data.list.forEach(item => {
          this.branchList.push(new SelectModel(item.name, item.id));          
        });
      });
  }

  public onSelectBranch(id: number) {
    if (id) {
      localStorage.setItem('branch', id.toString());
    }
  }

  public onCloseMenu(item: SidebarNavigation) {
    item.opened = false;
  }

  public onSelectMenuItem(item: SidebarNavigation) {
    this.routes.forEach(element => {
      element.unSelected = false;

      if (element.exact) {
        element.unSelected = true;
      }

      element.exact = false;
    });

    item.exact = true;
    item.opened = false;
    this.isFirstInit = false;
  }
}
