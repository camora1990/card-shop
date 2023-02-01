import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { SweetAlertService } from '../../../core/services/sweet-alert.service';

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
	loading: boolean = false
	constructor(
		private $auth: AuthService,
		private route: Router,
		private $swal: SweetAlertService,
	) {}
	ngOnDestroy(): void {
		this.suscriptions.forEach((s) => s.unsubscribe());
	}

	ngOnInit(): void {}

	login(event: MouseEvent) {
		this.loading = true
		const suscription = this.$auth.loginGoogle().subscribe({
			next: (user) => {
				this.loading = false
				this.$swal.seccessMessage(`Welcome ${user[0].username}`);
				this.route.navigate(['card-shop']);
			},
		});
		this.suscriptions.push(suscription);
	}
}
