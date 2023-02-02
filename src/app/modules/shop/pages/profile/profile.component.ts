import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserModel } from '../../../core/domain/entities/user.model';
import { UserService } from '../../../core/services/user.service';
import { tap, Subscription } from 'rxjs';
import { LoadingService } from '../../../core/services/loading.service';
import { RechargeService } from 'src/app/modules/core/services/recharge.service';
import { Recharge } from 'src/app/modules/core/domain/entities/recharge.model';
import { uuidv4 } from '@firebase/util';
import { ISODate } from 'src/app/modules/core/domain/valueObject/date.model';
import { ResponseError } from '../../../core/utils/responseError';
import { SweetAlertService } from '../../../core/services/sweet-alert.service';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
	user: UserModel | null = null;
	suscriptions: Subscription[] = [];
	constructor(
		private $user: UserService,
		private $recharge: RechargeService,
		private $loading: LoadingService,
		private $responseError: ResponseError,
		private $swal: SweetAlertService,
	) {}

	ngOnDestroy(): void {
		this.suscriptions.forEach((e) => e.unsubscribe());
	}

	ngOnInit(): void {
		this.$loading.showLoading.next(true);
		this.suscriptions.push(
			this.$user
				.getUser(this.$user.currenUser?.uid!)
				.pipe(tap((user) => (this.user = user[0])))
				.subscribe(() => this.$loading.showLoading.next(false)),
		);
	}

	recharge() {
		const datafake: Recharge = {
			uid: uuidv4(),
			amount: 250,
			performedAt: ISODate.now().ISOString,
			userId: this.$user.currenUser?.uid!,
		};
		this.$recharge.createRecharge(datafake, this.user!).subscribe({
			next: () => {
				this.$loading.showLoading.next(false);
				this.$swal.seccessMessage(
					`${datafake.amount} dollars were recharged to your account`,
				);
			},
			error: (error) => this.$responseError.Error(error),
		});
	}
}
