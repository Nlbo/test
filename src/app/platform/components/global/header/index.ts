import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BranchesService } from '@api/branches';
import { SidebarNavigation } from '@platform/models/sidebar-nav';
import { SelectModel } from '@platform/models/select';
import { Unsubscribable } from '@platform/decorators/unsubscribable.decorator';
import { BaseComponent } from '@platform/helpers/base.component';

@Component({
  selector: 'app-header',
  templateUrl: './index.html',
  styleUrls: ['./index.scss'],
})
export class Header extends BaseComponent implements OnInit {
  // branch = '';

  // constructor(
  //   private router: Router,
  //   private branchService: BranchesService,
  // ) {
  // }

  // showMenu(event) {
  //   const elem: any = document.getElementsByClassName('P-menu');
  //   const elem2: any = document.getElementsByClassName('menu-dropdown-container');
  //   for (let i = 0; i < elem.length; i++) {
  //     elem[i].className = elem[i].className.split(' active-select active-menu').join('');
  //     elem2[i].className = elem2[i].className.split(' active').join('');
  //   }

  //   event.target.parentElement.className += ' active-select active-menu';
  //   if (event.target.parentElement.getElementsByClassName('menu-dropdown-container')[0]) {
  //     event.target.parentElement.getElementsByClassName('menu-dropdown-container')[0].className.indexOf('active') < 0 ?
  //       event.target.parentElement.getElementsByClassName('menu-dropdown-container')[0].className += ' active' :
  //       event.target.parentElement.getElementsByClassName('menu-dropdown-container')[0].className = event.target.parentElement.getElementsByClassName('menu-dropdown-container')[0].className.split(' active').join('');

  //   }
  // }

  // testRoute() {
  //   this.router.navigate(['/admin/home/settings']);
  // }

  // ngOnInit(): void {
  //   this.branchService.getBranchesList(0, 9999).subscribe((data: any) => {
  //     this.branchList = data.list;
  //   });
  //   const branch = localStorage.getItem('branch');
  //   if (branch) this.branch = branch;
  // }

  @Input() routes: SidebarNavigation[] = [];
  public notDefined: undefined;
  public isFirstInit: boolean = true;

  // Array
  public branchList = [];

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
  }

  public changeItemIsOpenedState = (item: SidebarNavigation): void => {
    this.isFirstInit = false;

    this.routes.forEach(element => {
      element.exact = false;

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
        // data.list.forEach(item => {
        //   this.branchList.push(new SelectModel(item.name, item.id));
        // });
        this.branchList = data.list;
      });
  }

  public onSelectBranch(event) {    
    localStorage.setItem('branch', event.target.value);
  }

  public onCloseMenu(item: SidebarNavigation) {
    item.opened = false;
  }

  public onSelectMenuItem(item: SidebarNavigation) {
    this.routes.forEach(element => {
      element.exact = false;
    });

    item.exact = true;
    item.opened = false;
    this.isFirstInit = false;
  }
}
