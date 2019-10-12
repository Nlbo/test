import { SidebarNavigation } from '@models/sidebar-nav';

export interface ISidebarNavigation {
  name: string;
  languagePath?: string;
  languageControl?: string;
  path?: string;
  icon?: string;
  exact?: boolean;
  opened?: boolean;
  children?: SidebarNavigation[];
}
