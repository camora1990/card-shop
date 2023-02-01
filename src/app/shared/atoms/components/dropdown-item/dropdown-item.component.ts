import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from '../../../../modules/core/domain/valueObject/menuItem.model';

@Component({
  selector: 'app-dropdown-item',
  templateUrl: './dropdown-item.component.html',
  styleUrls: ['./dropdown-item.component.scss']
})
export class DropdownItemComponent implements OnInit {

  @Input() item! : MenuItem 
  constructor() { }

  ngOnInit(): void {
  }

}
