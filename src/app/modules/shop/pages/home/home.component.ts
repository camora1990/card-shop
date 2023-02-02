import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { MenuModel } from 'src/app/modules/core/domain/valueObject/menuModel';
import { UserService } from 'src/app/modules/core/services/user.service';

import { LoadingService } from '../../../core/services/loading.service';
import { UserModel } from '../../../core/domain/entities/user.model';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
	showLoading: boolean = false;
	menu: MenuModel;
	user!: UserModel;
	constructor(
		private $loading: LoadingService,
		private $auth: AuthService,
		private $user: UserService,
		private $route: Router,
	) {
		this.menu = {
			brand: true,
			imgBrand: '../../../../../assets/brand.png',
			items: [
				{
					itemClass: 'nav-item',
					placeHolder: 'Home',
					router: '/card-shop',
				},
				{
					itemClass: 'nav-item',
					placeHolder: 'My deck',
					router: '/card-shop/my-deck',
				},
				{
					itemClass: 'nav-item',
					placeHolder: 'Recharge',
					router: '',
				},
			],
		};
	}

	ngOnInit(): void {
		this.$loading.showLoading.subscribe((value) => {
			this.showLoading = value;
		});
		this.$user.getUser(this.$user.currenUser?.uid!).pipe(
			tap((user) => {
				this.user = user[0];
			}),
		).subscribe();
	}

	logout(event: MouseEvent) {
		this.$auth.logout().subscribe({
			next: () => this.$route.navigate(['/auth']),
		});
	}

	public get currentUser(): UserModel | null {
		return this.user;
	}
}
