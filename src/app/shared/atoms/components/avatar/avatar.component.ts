import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {

  @Input() classImg: string='dropdown-toggle'
  @Input() id: string ="dropdownMenu2"
  @Input() alt:string ="avatar"
  @Input() image: string =''
  @Output() eventClick: EventEmitter<MouseEvent> = new EventEmitter()
  constructor() { }

  ngOnInit(): void {
  }

  click(event:MouseEvent){
    this.eventClick.emit(event)
  }

}
