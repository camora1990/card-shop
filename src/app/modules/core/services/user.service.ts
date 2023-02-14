import { Injectable } from '@angular/core';

import { UserModel } from '../domain/entities/user.model';
import { Observable } from 'rxjs';
import { collection, collectionData, CollectionReference, doc, docData, Firestore, setDoc, where ,} from '@angular/fire/firestore';
import { Auth ,User as GoogleUser} from '@angular/fire/auth';
import { query } from '@firebase/firestore';

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

	public createUser(user: UserModel): Promise<void> {
		const userRef = doc(this.refCollectionUser, user.uid);
		return setDoc(userRef, user);
	}

	public getUser(uid: string): Observable<UserModel[]> {
		const query_user = query(this.refCollectionUser,where('uid',"==",uid))
		return collectionData(query_user) as Observable<UserModel[]>
	}

	public updateUser(user: UserModel): Promise<void> {
		const userRef = doc(this.refCollectionUser, user.uid);
		return setDoc(userRef, user);
	}
}
