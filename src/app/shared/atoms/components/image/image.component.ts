import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit {

  @Input() classImage: string = 'card-img-top'
  @Input() src: string = ''
  @Input() alt: string = 'card-image'
  @Input() height: string = '350px'
  constructor() { }

  ngOnInit(): void {
  }

}
