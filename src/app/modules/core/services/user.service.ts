import { Injectable } from '@angular/core';
import {
	CollectionReference,
	doc,
	docData,
	Firestore,
	setDoc,
} from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';
import { Auth, User as GoogleUser } from '@angular/fire/auth';
import { User } from '../domain/entities/user.model';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class UserService {
	private refCollectionUser: CollectionReference;
	constructor(private $firestore: Firestore, private $auth: Auth) {
		this.refCollectionUser = collection(this.$firestore, 'users');
	}

	public get currenUse(): GoogleUser | null {
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
