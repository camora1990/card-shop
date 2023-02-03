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
import { FormControl, Validators } from '@angular/forms';
import { ValidFormControlModel } from 'src/app/modules/core/domain/valueObject/validFormControlModel';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
	user: UserModel | null = null;
	suscriptions: Subscription[] = [];
	amountControl!: FormControl;
	nameControl: string = 'amount';
	availableAmount: number = 200;
	minAmount: number = 1;
	amountInputData: ValidFormControlModel<number> | null = null;
	maxAmount: number = 200;
	
	constructor(
		private $user: UserService,
		private $recharge: RechargeService,
		private $loading: LoadingService,
		private $responseError: ResponseError,
		private $swal: SweetAlertService,
	) {
		this.amountControl = new FormControl();
		this.$loading.showLoading.next(true);
	}

	ngOnDestroy(): void {
		this.suscriptions.forEach((e) => e.unsubscribe());
	}

	ngOnInit(): void {
	
		this.suscriptions.push(
			this.$user
				.getUser(this.$user.currenUser?.uid!)
				.pipe(
					tap((user) => {
						debugger
						this.user = user[0];
						this.availableAmount =
							this.maxAmount -
							this.$recharge.totalRechargeToday(user[0]);
						this.validationsFormControl();
					}),
				)
				.subscribe(() => this.$loading.showLoading.next(false)),
		);
	}

	validationsFormControl() {
		this.amountControl.setValidators([
			Validators.required,
			Validators.min(this.minAmount),
			Validators.max(this.availableAmount),
		]);
	}

	recharge() {
		if (!this.amountInputData?.valid) {
			this.amountControl.markAsTouched();
			return;
		}
		const recharge = this.createRecharge();
		this.$loading.showLoading.next(true)
		this.$recharge.createRecharge(recharge, this.user!).subscribe({
			next: () => {
				this.$loading.showLoading.next(false);
				this.amountControl.reset();
				this.$swal.seccessMessage(
					`${recharge.amount} dollars were recharged to your account`,
				);
			},
			error: (error) => this.$responseError.Error(error),
		});
	}

	validAmount(event: ValidFormControlModel<number>) {
		this.amountInputData = event;
	}

	createRecharge(): Recharge {
		return {
			amount: Number(this.amountInputData?.value!),
			performedAt: ISODate.now().ISOString,
			uid: uuidv4(),
			userId: this.user?.uid!,
		};
	}
}
