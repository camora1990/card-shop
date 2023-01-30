import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
	title: string = 'Cards shop';
	subTitle: string = 'Available now';
  placeHolder:string = "Sign in with google"
	constructor() {}

	ngOnInit(): void {}
}
