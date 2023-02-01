import { Component, OnInit, OnDestroy } from '@angular/core';
import { CardGroupBy } from 'src/app/modules/core/domain/entities/cardGroupBy.model';
import { Card } from '../../../core/domain/entities/card.model';
import { CardService } from '../../../core/services/card.service';
import { Subscription, switchMap, tap } from 'rxjs';
import { AuthService } from '../../../auth/services/auth.service';
import { MenuModel } from '../../../core/domain/valueObject/menuModel';
import { Router } from '@angular/router';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
	groupCards: CardGroupBy[] = [];
	suscriptions: Subscription[] = [];
	menu: MenuModel;
	constructor(
		private $card: CardService,
		private $auth: AuthService,
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
					router: '/card-shop',
				},
			],
		};
	}

	ngOnDestroy(): void {
		this.suscriptions.forEach((e) => e.unsubscribe());
	}

	ngOnInit(): void {
		// this.suscriptions.push(
		// 	this.$card
		// 		.getCards()
		// 		.pipe(tap((resp) => this.transformData(resp)))
		// 		.subscribe(),
		// );
	}

	buyCard(card: Card) {
		this.$card.buyCard(card).subscribe();
	}

	private transformData(cards: Card[]) {
		const idHero = Array.from(new Set(cards.map((e) => e.idHero)));
		this.groupCards = idHero.reduce((ant: CardGroupBy[], act: string) => {
			ant = [
				...ant,
				{
					[act]: cards.filter((e) => e.idHero == act),
				},
			];
			return ant;
		}, []);
	}

	logout(event: MouseEvent) {
		this.$auth.logout().subscribe({
			next: () => this.$route.navigate(['/auth']),
		});
	}
}
