import { Component, Input, OnInit } from '@angular/core';

interface Style {
	fontWeight: string;
	fontSize: string;
	color: string;
}

@Component({
	selector: 'app-title',
	templateUrl: './title.component.html',
	styleUrls: ['./title.component.scss'],
})
export class TitleComponent implements OnInit {
	constructor() {}
	@Input() label: string = 'Title';
	@Input() size: string = '3rem';
	@Input() fontWeght: string = '700';
	@Input() color: string = "#E55151";
	styles: Style | Object = {};
	ngOnInit(): void {
		this.styles = {
			color: this.color,
			fontSize: this.size,
			fontWeight: this.fontWeght,
		};
	}
}
