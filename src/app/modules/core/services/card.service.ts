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

import { collection, DocumentReference } from '@firebase/firestore';
import {  uuidv4} from "@firebase/util";
import {
	Observable,
	throwError,
	switchMap,
	of,
	from,
	take,
	zip,
	mergeMap,
} from 'rxjs';
import { Card } from '../domain/entities/card.model';
import { UserService } from './user.service';
import { HistoryChange } from '../domain/entities/historyChange.model';
import { HistoryType } from '../domain/enums/historyType.model';
import { User } from '../domain/entities/user.model';

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
		return this.$user.getUser(this.$user.currenUser?.uid!).pipe(
			take(1),
			switchMap((user) => {
				if (user[0].balance < card.price)
					return throwError(() => `Not enough balance`);
				return of(user);
			}),
			switchMap((user) => {
				return zip(this.getCard(card.uid), of(user));
			}),
			mergeMap(([card, user]) => {
				return this.validateBuyCard(card,user[0],cardReference)
			}),
		);
	}

	public getCard(uid: string): Observable<Card> {
		const cards = doc(this.$firestore, `cards/${uid}`);
		return docData(cards, { idField: 'uid' }) as Observable<Card>;
	}

	private validateBuyCard(card:Card,user:User, cardReference:DocumentReference){
		if (card.activeForSale) {
			const {avatar,uid,email,username} = user
			const history: HistoryChange={
				owner: {avatar,email,uid,username},
				type: HistoryType.PURCHASE,
				uid: uuidv4()
			}
			card.history.push(history)
			user.balance -= card.price;
			user.deck = [...user.deck, card];
			return zip(
				from(
					setDoc(cardReference, {
						...card,
						activeForSale: false,
					}),
				),
				from(this.$user.updateUser(user)),
			);
		}

		return throwError(()=>`Card not available for sale `);

	}
}
