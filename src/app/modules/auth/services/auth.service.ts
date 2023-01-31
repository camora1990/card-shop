import { Injectable } from '@angular/core';

import {
	GoogleAuthProvider,
	signInWithPopup,
	signOut,
	User
} from '@firebase/auth';
import { from, switchMap, tap, Observable } from 'rxjs';
import { UserService } from '../../core/services/user.service';
import { UserModel } from '../../core/domain/entities/user.model';
import { Auth } from '@angular/fire/auth';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	constructor(private $auth: Auth, private $user: UserService) {}

	loginGoogle() {
		return from(signInWithPopup(this.$auth, new GoogleAuthProvider())).pipe(
			switchMap((data) => {
				return this.$user.getUser(data.user.uid);
			}),
			tap((user) => {
				!user[0] && this.createUser(this.$auth.currentUser!);
			}),
		);
	}

	logout(): Promise<void> {
		return signOut(this.$auth);
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
