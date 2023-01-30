import { Component, Input, OnInit } from '@angular/core';
interface Style {
	fontWeight: string;
	fontSize: string;
	color: string;
}

@Component({
	selector: 'app-subtitle',
	templateUrl: './subtitle.component.html',
	styleUrls: ['./subtitle.component.scss'],
})
export class SubtitleComponent implements OnInit {
	@Input() label: string = 'Title';
	@Input() size: string = '3rem';
	@Input() fontWeght: string = '700';
	@Input() color: string = '#d9d6d1';
	styles: Style | Object = {};
	ngOnInit(): void {
		this.styles = {
			color: this.color,
			fontSize: this.fontWeght,
			fontWeight: this.fontWeght,
		};
	}
}
