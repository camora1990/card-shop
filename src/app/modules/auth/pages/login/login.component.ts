import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
	title: string = 'Cards shop';
	subTitle: string = 'Available now';
	placeHolder: string = 'Sign in with google';
	suscriptions: Subscription[] = [];
	constructor(private $auth: AuthService, private route: Router) {}
	ngOnDestroy(): void {
		this.suscriptions.forEach((s) => s.unsubscribe());
	}

	ngOnInit(): void {}

	login(event: MouseEvent) {
		const suscription = this.$auth.loginGoogle().subscribe({
			next: (_) => {
				debugger
				this.route.navigate(['card-shop']);
			},
		});
		this.suscriptions.push(suscription);
	}
}
