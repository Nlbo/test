import { Component, OnInit, Inject } from '@angular/core';

import { SidebarNavigation } from '@models/sidebar-nav';
import { Config } from '@platform/models/config';

@Component({
  templateUrl : '../view/index.html',
  styleUrls   : ['../styles/index.scss'],
})

export class Controller implements OnInit {

  public routes: SidebarNavigation[] = [];
  private schedule: SidebarNavigation;
  private services: SidebarNavigation;
  private staff: SidebarNavigation;
  private customers: SidebarNavigation;
  private finance: SidebarNavigation;
  private settings: SidebarNavigation;

  constructor(
    @Inject('config') private config: Config,
  ) {
  }

  ngOnInit() {
    this.generateRoutes();
  }

  private generateRoutes(): void {
    this.schedule = new SidebarNavigation({
      name: 'Расписание',
      path: `${this.config.baseRoute}/main`,
    });

    this.services = new SidebarNavigation({
      name: 'Услуги',
      path: `${this.config.baseRoute}/services`,
    });

    this.staff = new SidebarNavigation({
      name: 'Персонал',
      path: `${this.config.baseRoute}`,
      children: [
        new SidebarNavigation({
          name: 'Сотрудники',
          path: 'employees',
        }),
        new SidebarNavigation({
          name: 'Должность',
          path: 'position',
        }),
        new SidebarNavigation({
          name: 'Комнаты',
          path: 'rooms',
        }),
        new SidebarNavigation({
          name: 'Расчет',
          path: 'salaries',
        }),
        new SidebarNavigation({
          name: 'Расписание',
          path: 'schedule',
        }),
      ],
    });

    this.customers = new SidebarNavigation({
      name: 'Клиенты',
      path: `${this.config.baseRoute}`,
      children: [
        new SidebarNavigation({
          name: 'Клиенты',
          path: 'clients',
        }),
        new SidebarNavigation({
          name: 'Группы',
          path: 'groups',
        }),
      ],
    });

    this.finance = new SidebarNavigation({
      name: 'Финансы',
      path: `${this.config.baseRoute}`,
      children: [
        new SidebarNavigation({
          name: 'Приход / Расход',
          path: 'incoming-costs',
        }),
        new SidebarNavigation({
          name: 'Отчёт по сотрудникам',
          path: 'employee-report',
        }),
      ],
    });

    this.settings = new SidebarNavigation({
      name: 'Настройки',
      path: `${this.config.baseRoute}`,
      children: [
        new SidebarNavigation({
          name: 'Филиалы',
          path: 'branches',
        }),
        new SidebarNavigation({
          name: 'Админы',
          path: 'admins',
        }),
      ],
    });

    this.routes = [
      this.schedule,
      this.services,
      this.staff,
      this.customers,
      this.finance,
      this.settings,
    ];
  }
}
