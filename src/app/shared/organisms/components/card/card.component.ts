import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() title: string ="Title"
  @Input() subtitle: string =""
  @Input() classImage: string = 'card-img-top'
  @Input() hasImage: boolean = true
  @Input() src: string = ''
  @Input() alt: string = 'card-image'
  @Input() heightImage: string = ''
  styles!: { color: string; fontSize: string; fontWeight: string; } ;
  @Input() description: string = ''
  constructor() { }

  ngOnInit(): void {
    this.styles = {
			color: "#E55151",
			fontSize: "1.5rem",
			fontWeight: "500",
		};
  }

}
