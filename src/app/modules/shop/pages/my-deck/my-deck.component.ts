import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { LoadingService } from '../../../core/services/loading.service';
import { CardGroupBy } from 'src/app/modules/core/domain/entities/cardGroupBy.model';
import { tap, Subscription } from 'rxjs';
import TransformCard from '../../../core/utils/transformCards';
import { ResponseError } from 'src/app/modules/core/utils/responseError';
import { Router } from '@angular/router';

@Component({
	selector: 'app-my-deck',
	templateUrl: './my-deck.component.html',
	styleUrls: ['./my-deck.component.scss'],
})
export class MyDeckComponent implements OnInit , OnDestroy{
	groupCards: CardGroupBy[] = [];
	subscriptions: Subscription[]=[]
	constructor(
		private $user: UserService,
		private $loading: LoadingService,
		private $responseError: ResponseError,
		private $route: Router,
	) {
		this.$loading.showLoading.next(true);
	}
	ngOnDestroy(): void {
		this.subscriptions.forEach(s=>s.unsubscribe())
	}

	ngOnInit(): void {
		const userSubscription = this.$user
			.getUser(this.$user.currenUser?.uid!)
			.pipe(
				tap((res) => {
					if (res.length == 0 || res == undefined)
						throw new Error('Login required');
					this.groupCards = TransformCard.transformData(res[0].deck);
				}),
			)
			.subscribe({
				next: () => {
					this.$loading.showLoading.next(false);
				},
				error: (err) => {
					this.$responseError.Error(err);
				},
			});
			this.subscriptions.push(userSubscription)

	}

	goHome() {
		this.$route.navigate(['/card-shop']);
	}
}
