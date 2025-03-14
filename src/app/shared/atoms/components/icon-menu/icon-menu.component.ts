import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'app-icon-menu',
	templateUrl: './icon-menu.component.html',
	styleUrls: ['./icon-menu.component.scss'],
})
export class IconMenuComponent implements OnInit {
	@Input() target: string = 'data-bs-target';
	constructor() {}

	ngOnInit(): void {}
}
