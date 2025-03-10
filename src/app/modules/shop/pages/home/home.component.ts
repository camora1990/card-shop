import { Component, OnInit, AfterViewInit } from '@angular/core';

import { Router } from '@angular/router';
import { tap, throwError, switchMap, of } from 'rxjs';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { MenuModel } from 'src/app/modules/core/domain/valueObject/menuModel';
import { UserService } from 'src/app/modules/core/services/user.service';

import { LoadingService } from '../../../core/services/loading.service';
import { UserModel } from '../../../core/domain/entities/user.model';
import { ResponseError } from '../../../core/utils/responseError';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
	showLoading: boolean = true;
	menu: MenuModel;
	user!: UserModel;
	constructor(
		private $loading: LoadingService,
		private $auth: AuthService,
		private $user: UserService,
		private $route: Router,
		private $responseError: ResponseError
	) {
		this.menu = {
			brand: true,
			imgBrand: '../../../../../assets/brand.png',
			items: [
				{
					itemClass: 'nav-item',
					placeHolder: 'Home',
					router: '/card-shop/marvel',
				},
				{
					itemClass: 'nav-item',
					placeHolder: 'My deck',
					router: '/card-shop/my-deck',
				},
				{
					itemClass: 'nav-item',
					placeHolder: 'Recharge',
					router: '/card-shop/recharge',
				},
			],
		};
		this.$loading.showLoading.subscribe((value) => {
			this.showLoading = value;
		});
	}

	ngOnInit(): void {
		this.$user
			.getUser(this.$user.currenUser?.uid!)
			.pipe(
				switchMap((user) => {
					if (user.length >0) {
						return of(this.user = user[0]);
					}else{
						return throwError(()=>`Login required`)
					}
				}),
			)
			.subscribe({
				error: (err)=> this.$responseError.Error(err)
			});
	}

	logout(event: MouseEvent) {
		this.$auth.logout().subscribe({
			next: () => this.$route.navigate(['/auth']),
		});
	}

	public get currentUser(): UserModel | null {
		return this.user;
	}

	navigate(event: MouseEvent) {
		this.$route.navigate(['/card-shop/profile']);
	}
}
