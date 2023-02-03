import { Injectable } from '@angular/core';
import {
	CollectionReference,
	Firestore,
	doc,
	setDoc,
} from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';
import { from, Observable, switchMap, of, zip } from 'rxjs';
import { Recharge } from '../domain/entities/recharge.model';
import { UserModel } from '../domain/entities/user.model';
import { ISODate } from '../domain/valueObject/date.model';
import { BusinessError } from '../utils/businessError';
import { UserService } from './user.service';

@Injectable({
	providedIn: 'root',
})
export class RechargeService {
	private rechargeRef: CollectionReference;

	constructor(private $fire: Firestore, private $user: UserService) {
		this.rechargeRef = collection(this.$fire, 'recharges');
	}

	public createRecharge(
		recharge: Recharge,
		user: UserModel,
	): Observable<[void, void]> {
		const ref = doc(this.rechargeRef, recharge.uid);
		return of(true).pipe(
			switchMap(() => {
				const newMount = this.validateRecharge(user, recharge);
				user.recharges.push(recharge);
				user.balance = newMount;
				return zip(
					from(setDoc(ref, recharge)),
					from(this.$user.updateUser(user)),
				);
			}),
		);
	}

	
	public totalRechargeToday(user: UserModel) : number {
		const now = ISODate.now().ISOString;
		return user.recharges
		.filter((e) => ISODate.verifyDate(e.performedAt, now))
		.reduce((back, current) => (back += current.amount), 0);

	}
	

	private validateRecharge(user: UserModel, recharge: Recharge) {
	

		const rechargeToday = this.totalRechargeToday(user)

		if (rechargeToday >= 200)
			throw new BusinessError(
				'You have already exceeded the maximum amount of money recharge per day',
			);
		const newTotal = rechargeToday + recharge.amount;
		if (newTotal > 200)
			throw new BusinessError(`The maximum amount to recharge is 
    ${200 - rechargeToday}`);

		return newTotal;
	}
}
