import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button-icon',
  templateUrl: './button-icon.component.html',
  styleUrls: ['./button-icon.component.scss']
})
export class ButtonIconComponent implements OnInit {

  @Input() type: "fa-regular" | "fa-brands" | "fa-solid" = "fa-brands"
  @Input() iconClass : string = "fa-google-plus"
  @Input() color: string = '#cdcdcd';

  @Input() classBtn: 'primary-button' | 'secondary-button' = 'primary-button';
	@Input() placeholder: string = '';

  @Output() clickEvent: EventEmitter<MouseEvent> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  click(event: MouseEvent) {
		this.clickEvent.emit(event);
	}

}
