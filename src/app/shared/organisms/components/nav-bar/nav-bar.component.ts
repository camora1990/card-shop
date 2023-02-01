import { Component, Input, OnInit } from '@angular/core';
import { MenuModel } from '../../../../modules/core/domain/valueObject/menuModel';

@Component({
	selector: 'app-nav-bar',
	templateUrl: './nav-bar.component.html',
	styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
	@Input() menuModel!: MenuModel;
	constructor() {}

	ngOnInit(): void {}
}
