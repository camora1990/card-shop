import { Injectable } from '@angular/core';
import {
	collectionData,
	CollectionReference,
	doc,
	docData,
	Firestore,
	query,
	setDoc,
	where,
} from '@angular/fire/firestore';

import { collection } from '@firebase/firestore';
import { Observable, tap, throwError, switchMap, of, from } from 'rxjs';
import { Card } from '../domain/entities/card.model';
import { UserService } from './user.service';

@Injectable({
	providedIn: 'root',
})
export class CardService {
	private refCards: CollectionReference;

	constructor(private $firestore: Firestore, private $user: UserService) {
		this.refCards = collection(this.$firestore, 'cards');
	}

	public getCards(): Observable<Card[]> {
		const query_cards = query(
			this.refCards,
			where('activeForSale', '==', true),
		);

		return collectionData(query_cards, {
			idField: 'uid',
		}) as unknown as Observable<Card[]>;
	}

	public buyCard(card: Card) {
		const cardReference = doc(this.refCards, card.uid);
		// 
		return this.$user.getUser("5pygPrNvlkSZ9koFYPD41r0iyTX2")
	}

	public getCard(uid: string): Observable<Card> {
		const cards = doc(this.$firestore, `cards/${uid}`);
		return docData(cards, { idField: 'uid' }) as Observable<Card>;
	}
}
