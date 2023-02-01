import { Component, Input, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { MenuItem } from '../../../../modules/core/domain/valueObject/menuItem.model';

@Component({
	selector: 'app-item-menu',
	templateUrl: './item-menu.component.html',
	styleUrls: ['./item-menu.component.scss'],
})
export class ItemMenuComponent implements OnInit {
	@Input() menuItem!: MenuItem;
	constructor(private router:Router) {}

	ngOnInit(): void {}


}
