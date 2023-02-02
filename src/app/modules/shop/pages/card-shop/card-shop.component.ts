import { Component, OnInit, OnDestroy } from '@angular/core';
import { CardGroupBy } from 'src/app/modules/core/domain/entities/cardGroupBy.model';
import { Card } from '../../../core/domain/entities/card.model';
import { CardService } from '../../../core/services/card.service';
import { Subscription, tap } from 'rxjs';
import { SweetAlertService } from '../../../core/services/sweet-alert.service';
import { LoadingService } from '../../../core/services/loading.service';
import TransformCard from 'src/app/modules/core/utils/transformCards';

@Component({
	selector: 'app-card-shop',
	templateUrl: './card-shop.component.html',
	styleUrls: ['./card-shop.component.scss'],
})
export class CardShopComponent implements OnInit, OnDestroy {
	groupCards: CardGroupBy[] = [];
	suscriptions: Subscription[] = [];
	constructor(
		private $card: CardService,
		private $swal: SweetAlertService,
		private $loading: LoadingService,
	) {}

	ngOnDestroy(): void {
		this.suscriptions.forEach((e) => e.unsubscribe());
	}

	ngOnInit(): void {
		this.$loading.loading.next(true);
		this.suscriptions.push(
			this.$card
				.getCards()
				.pipe(
					tap(
						(resp) =>
							(this.groupCards =
								TransformCard.transformData(resp)),
					),
				)
				.subscribe(() => this.$loading.loading.next(false)),
		);
	}

	buyCard(card: Card) {
		this.$loading.loading.next(true);
		this.$swal.confirmDialog().then((result) => {
			if (result.isConfirmed) {
				this.$card.buyCard(card).subscribe({
					next: () => {
						this.$swal
							.seccessMessage(
								`Card ${card.name} purchased successfully`,
							)
							.then(() => this.$loading.loading.next(false));
					},
					error: (err) => {
						this.$swal.errorMessage(undefined, err);
						this.$loading.loading.next(false);
					},
				});
			}
		});
	}
}
