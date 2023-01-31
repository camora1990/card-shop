import { Injectable } from '@angular/core';

import {
	GoogleAuthProvider,
	signInWithPopup,
	signOut,
	User,
} from '@firebase/auth';
import { from, switchMap, tap, Observable, take } from 'rxjs';
import { UserService } from '../../core/services/user.service';
import { UserModel } from '../../core/domain/entities/user.model';
import { Auth } from '@angular/fire/auth';
import { LogService } from '../../core/services/log.service';
import { LogTypes } from '../../core/domain/enums/logTypes.model';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	constructor(
		private $auth: Auth,
		private $user: UserService,
		private $log: LogService,
	) {}

	loginGoogle() {
		return from(signInWithPopup(this.$auth, new GoogleAuthProvider())).pipe(
			take(1),
			switchMap((data) => {
				return this.$user.getUser(data.user.uid);
			}),
			tap((user) => {
				!user[0] && this.createUser(this.$auth.currentUser!);
				this.$log.createLog(LogTypes.LOGIN, 'Authenticated user');
			}),
		);
	}

	logout(): Observable<void> {
		const user = this.$user.currenUser!;
		return from(signOut(this.$auth)).pipe(
			take(1),
			tap(() =>
				this.$log.createLog(LogTypes.LOGOUT, 'logged out user', user),
			),
		);
	}

	private createUser(user: User): void {
		const newUser: UserModel = {
			avatar: user.photoURL!,
			balance: 0,
			deck: [],
			email: user.email!,
			recharges: [],
			uid: user.uid,
			username: user.displayName!,
		};
		this.$user.createUser(newUser).then();
	}
}
