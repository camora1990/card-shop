import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss']
})
export class BadgeComponent implements OnInit {

  @Input() classBadge: string = 'bg-success'
  @Input() placeHolder: string | number = 'Badge'
  constructor() { }

  ngOnInit(): void {
    this.classBadge =`badge ${this.classBadge}`
  }

}
