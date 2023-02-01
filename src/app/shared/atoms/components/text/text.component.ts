import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent implements OnInit {

  @Input() text: string =""
  @Input() color: string = '#d9d6d1'
  @Input() classText : string = "card-text"
  constructor() { }

  ngOnInit(): void {
  }

}
