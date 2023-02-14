import { SweetAlertService } from '../services/sweet-alert.service';
import { Router } from '@angular/router';
import { LoadingService } from '../services/loading.service';
import { Injectable } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { BusinessError } from './businessError';
@Injectable({
	providedIn: 'root',
})
export class ResponseError {
	constructor(
		private $swal: SweetAlertService,
		private $router: Router,
		private $loading: LoadingService,
		private $auth: AuthService,
	) {}
	public Error(error: any) {
		if (error instanceof BusinessError) {
			this.$swal
				.errorMessage(undefined, error.message)
				.then(() => this.$loading.showLoading.next(false));
				return
		}
		this.$swal
			.errorMessage(
				undefined,
				error.message || error || 'Internal error',
			)
			.then(() =>
				this.$auth.logout().subscribe(() => {
					this.$loading.showLoading.next(false);
					this.$router.navigate(['/auth']);
				}),
			);
	}
}
