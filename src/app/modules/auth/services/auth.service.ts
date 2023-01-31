import { Injectable } from '@angular/core';

import {
	GoogleAuthProvider,
	signInWithPopup,
	signOut,
	User as GoogleUser,
} from '@firebase/auth';
import { from, switchMap, tap, Observable } from 'rxjs';
import { UserService } from '../../core/services/user.service';
import { User } from '../../core/domain/entities/user.model';
import { Auth } from '@angular/fire/auth';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	constructor(private $auth: Auth, private $user: UserService) {}

	loginGoogle() {
		return from(signInWithPopup(this.$auth, new GoogleAuthProvider())).pipe(
			switchMap(({ user }) => {
				debugger
				return this.$user.getUser(user.uid);
			}),
			tap((user) => {
				debugger;
				!user && this.createUser(this.$auth.currentUser!);
			}),
		);
	}

	logout(): Promise<void> {
		return signOut(this.$auth);
	}

	private createUser(user: GoogleUser): void {
		const newUser: User = {
			avatar: user.displayName!,
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
