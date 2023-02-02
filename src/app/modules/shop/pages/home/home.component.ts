import { Component, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { MenuModel } from 'src/app/modules/core/domain/valueObject/menuModel';
import { UserService } from 'src/app/modules/core/services/user.service';

import { LoadingService } from '../../../core/services/loading.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
	showLoading: boolean = false;
	menu: MenuModel;
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
		this.$loading.loading.subscribe((value) => {
			this.showLoading = value;
		});
	}

	logout(event: MouseEvent) {
		this.$auth.logout().subscribe({
			next: () => this.$route.navigate(['/auth']),
		});
	}

	public get currentUser(): User | null {
		return this.$user.currenUser;
	}
}
