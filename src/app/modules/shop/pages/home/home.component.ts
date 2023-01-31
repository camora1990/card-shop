import { Component, OnInit, OnDestroy } from '@angular/core';
import { CardGroupBy } from 'src/app/modules/core/domain/entities/cardGroupBy.model';
import { Card } from '../../../core/domain/entities/card.model';
import { CardService } from '../../../core/services/card.service';
import { Subscription, switchMap, tap } from 'rxjs';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
	groupCards: CardGroupBy[] = [];
	suscriptions: Subscription[] = [];
	constructor(private $card: CardService, private auth:AuthService) {}

	ngOnDestroy(): void {
		this.suscriptions.forEach((e) => e.unsubscribe());
	}

	ngOnInit(): void {
		// this.suscriptions.push(
		// 	this.$card
		// 		.getCards()
		// 		.pipe(tap((resp) => this.transformData(resp)))
		// 		.subscribe((resp) => {}),
		// );
	}

	inactiveCard(card: Card) {
		 this.$card
			.buyCard(card)
			.subscribe((res)=>console.log(res));
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

	logout(){
		debugger
		this.auth.logout().then()
	}
}
