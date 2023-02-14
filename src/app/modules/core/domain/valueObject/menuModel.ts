import { MenuItem } from './menuItem.model';

export interface MenuModel {
	brand: boolean;
	imgBrand?:string;
	items: MenuItem[];
}
