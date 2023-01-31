import { Injectable } from '@angular/core';

import { User } from '../domain/entities/user.model';
import { Observable } from 'rxjs';
import { collection, CollectionReference, doc, docData, Firestore, setDoc ,} from '@angular/fire/firestore';
import { Auth ,User as GoogleUser} from '@angular/fire/auth';

@Injectable({
	providedIn: 'root',
})
export class UserService {
	private refCollectionUser: CollectionReference;
	constructor(private $firestore:Firestore, private $auth: Auth) {
		this.refCollectionUser = collection(this.$firestore, 'users');
	}

	public get currenUser(): GoogleUser | null {
		return this.$auth.currentUser;
	}

	public createUser(user: User): Promise<void> {
		const userRef = doc(this.refCollectionUser, user.uid);
		return setDoc(userRef, user);
	}

	public getUser(uid: string): Observable<User> {
		const userRef = doc(this.$firestore, `users/${uid}}`);
		return docData(userRef, { idField: 'uid' }) as Observable<User>;
	}

	public updateUser(user: User): Promise<void> {
		const userRef = doc(this.refCollectionUser, user.uid);
		return setDoc(userRef, user);
	}
}
