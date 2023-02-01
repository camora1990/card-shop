import { Component, OnInit, OnDestroy } from '@angular/core';
import { CardGroupBy } from 'src/app/modules/core/domain/entities/cardGroupBy.model';
import { Card } from '../../../core/domain/entities/card.model';
import { CardService } from '../../../core/services/card.service';
import { Subscription, tap } from 'rxjs';
import { AuthService } from '../../../auth/services/auth.service';
import { MenuModel } from '../../../core/domain/valueObject/menuModel';
import { Router } from '@angular/router';
import { MenuItem } from '../../../core/domain/valueObject/menuItem.model';
import { User } from '@angular/fire/auth';
import { UserService } from '../../../core/services/user.service';
import { SweetAlertService } from '../../../core/services/sweet-alert.service';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
	groupCards: CardGroupBy[] = [];
	suscriptions: Subscription[] = [];
	menu: MenuModel;
	configMenu: MenuItem[] = [];
	constructor(
		private $card: CardService,
		private $auth: AuthService,
		private $user: UserService,
		private $route: Router,
		private $swal: SweetAlertService,
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
					router: '',
				},
				{
					itemClass: 'nav-item',
					placeHolder: 'Recharge',
					router: '',
				},
			],
		};
	}

	ngOnDestroy(): void {
		this.suscriptions.forEach((e) => e.unsubscribe());
	}

	ngOnInit(): void {
		this.suscriptions.push(
			this.$card
				.getCards()
				.pipe(tap((resp) => this.transformData(resp)))
				.subscribe(),
		);
	}

	buyCard(card: Card) {
		this.$swal
			.confirmDialog()
			.then()
			.then((result) => {
				if (result.isConfirmed) {
					this.$card.buyCard(card).subscribe({
						next: () =>
							this.$swal.seccessMessage(
								`Card ${card.name} purchased successfully`,
							),
						error: (err) => this.$swal.errorMessage(undefined, err),
					});
				}
			});
	}

	private transformData(cards: Card[]) {
		const idHero = Array.from(new Set(cards.map((e) => e.idHero)));
		this.groupCards = idHero.reduce((ant: CardGroupBy[], act: string) => {
			const heroes = cards.filter((e) => e.idHero == act);
			ant = [
				...ant,
				{
					idHero: Number(act),
					quantity: heroes.length,
					hero: heroes[0],
				},
			];
			return ant;
		}, []).sort((a,b)=>a.hero.power-b.hero.power);
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
