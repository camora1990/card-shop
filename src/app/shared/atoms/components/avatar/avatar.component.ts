import { Component, Input, OnInit } from '@angular/core';

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
  constructor() { }

  ngOnInit(): void {
  }

}
