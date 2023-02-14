import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from '../../../../modules/core/domain/valueObject/menuItem.model';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {

  @Input() image: string = ''
  @Input() labelledby : string = ''
  @Input() menuItems:MenuItem[]=[]
  constructor() { }

  ngOnInit(): void {
  }

}
