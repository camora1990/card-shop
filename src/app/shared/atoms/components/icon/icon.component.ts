import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent implements OnInit {

  @Output() eventClick: EventEmitter<MouseEvent> = new EventEmitter();
  @Input() type: "fa-regular" | "fa-brands" | "fa-solid" = "fa-brands"
  @Input() iconClass : string = "fa-google-plus"
  @Input() color: string = '#d9d6d1';
  icon: string = ''
  constructor() { }

  ngOnInit(): void {
    this.icon = `${this.type} ${this.iconClass}`
  }

  click(event: MouseEvent) {
    this.eventClick.emit(event);
  }

}
