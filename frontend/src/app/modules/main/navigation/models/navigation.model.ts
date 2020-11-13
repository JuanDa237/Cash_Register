export enum Role {
	CASHIER = 'cashier',
	ADMINISTRATOR = 'administrator'
}

export interface User {
	name: string;
	role: string;
}

export interface RouteData {
	title?: string;
	activeTopNav?: string;
	roles: Role[];
	hideBreadcrumbs: boolean;
	breadcrumbs: Breadcrumb[];
}

export interface Breadcrumb {
	text: string;
	link?: string;
	active?: boolean;
}

export interface SideNavItems {
	[index: string]: SideNavItem;
}

export interface SideNavItem {
	icon?: string;
	text: string;
	link?: string;
	activeClass: boolean;
	submenu?: SideNavItem[];
}

export interface SideNavSection {
	text?: string;
	roles: Role[];
	items: string[];
}
