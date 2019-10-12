import { ISidebarNavigation } from '@interfaces/sidebar-nav';

export class SidebarNavigation {

  public name: string;
  public path: string;
  public languagePath: string;
  public languageControl: string;
  public opened: boolean = false;
  public exact: boolean = false;
  public unSelected: boolean = false;
  private _children: SidebarNavigation[] = [];

  constructor(data: ISidebarNavigation) {
    this.name = data.name;
    this.languagePath = data.languagePath;
    this.languageControl = data.languageControl;
    this.path = data.path;
    this.opened = data.opened;
    this.children = data.children || [];
    this.exact = data.exact;
  }

  public set children(data: SidebarNavigation[]) {
    if (data && data.length) {
      this._children = data.map(x => {
        x.path = `${this.path}/${x.path}`;
        return x;
      });
    }
  }

  public get children(): SidebarNavigation[] {
    return this._children;
  }
}
