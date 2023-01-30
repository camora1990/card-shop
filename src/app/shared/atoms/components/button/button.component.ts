import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
	selector: 'app-button',
	templateUrl: './button.component.html',
	styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
	@Input() classBtn: 'primary-button' | 'secondary-button' = 'primary-button';
	@Input() placeholder: string = 'Pimary';
	@Output() clickEvent: EventEmitter<MouseEvent> = new EventEmitter();
	constructor() {}

	ngOnInit(): void {}

	click(event: MouseEvent) {
		this.clickEvent.emit(event);
	}
}
