import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from '../../../../modules/core/domain/valueObject/menuItem.model';
import { MenuModel } from '../../../../modules/core/domain/valueObject/menuModel';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  @Input() menuItems!:MenuItem[]
  constructor() { }

  ngOnInit(): void {
  }

}
