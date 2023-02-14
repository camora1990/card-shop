import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { SweetAlertService } from '../../../core/services/sweet-alert.service';
import { LoadingService } from '../../../core/services/loading.service';
import { ResponseError } from 'src/app/modules/core/utils/responseError';

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
	loading: boolean = false;
	constructor(
		private $auth: AuthService,
		private route: Router,
		private $swal: SweetAlertService,
		private $responseError: ResponseError
	) {}
	ngOnDestroy(): void {
		this.suscriptions.forEach((s) => s.unsubscribe());
	}

	ngOnInit(): void {}

	login(event: MouseEvent) {
		this.loading = true;
		const suscription = this.$auth.loginGoogle().subscribe({
			next: (user) => {
				this.loading = false;
				this.$swal.seccessMessage(`Welcome ${user[0].username}`);
				this.route.navigate(['card-shop']);
			},
			error: (err) => {
				this.$responseError.Error(err)
				this.loading = false;
			},
		});
		this.suscriptions.push(suscription);
	}
}
