import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {

  @Input() classImg: string=''
  @Input() id: string =""
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
