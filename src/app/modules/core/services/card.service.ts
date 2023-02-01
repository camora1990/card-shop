import { Injectable } from '@angular/core';
import {
	collectionData,
	CollectionReference,
	doc,
	docData,
	Firestore,
	setDoc,
	where,
} from '@angular/fire/firestore';

import {
	collection,
	DocumentReference,
	query,
	orderBy,
} from '@firebase/firestore';
import { uuidv4 } from '@firebase/util';
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
import { UserModel } from '../domain/entities/user.model';
import { LogService } from './log.service';
import { LogTypes } from '../domain/enums/logTypes.model';

@Injectable({
	providedIn: 'root',
})
export class CardService {
	private refCards: CollectionReference;

	constructor(
		private $firestore: Firestore,
		private $user: UserService,
		private $log: LogService,
	) {
		this.refCards = collection(this.$firestore, 'cards');
	}

	public getCards(): Observable<Card[]> {
		const query_cards = query(
			this.refCards,
			where('activeForSale', '==', true)
		);

		return collectionData(query_cards) as unknown as Observable<Card[]>;
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
				return zip(this.getCardsByHero(Number(card.idHero)), of(user));
			}),
			mergeMap(([card, user]) => {
				return this.validateBuyCard(card, user[0], cardReference);
			}),
		);
	}

	public getCard(uid: string): Observable<Card> {
		const cards = doc(this.$firestore, `cards/${uid}`);
		return docData(cards, { idField: 'uid' }) as Observable<Card>;
	}

	public getCardsByHero(idHero: number) {
		const query_card = query(this.refCards, where('idHero', '==', idHero));

		return collectionData(query_card, {
			idField: 'uid',
		}) as Observable<Card[]>;
	}

	private validateBuyCard(
		card: Card[],
		user: UserModel,
		cardReference: DocumentReference,
	) {
		if (card[0].activeForSale) {
			const { avatar, uid, email, username } = user;
			const history: HistoryChange = {
				owner: { avatar, email, uid, username },
				type: HistoryType.PURCHASE,
				uid: uuidv4(),
			};
			card[0].history.push(history);
			user.balance -= card[0].price;
			user.deck = [...user.deck, card[0]];
			return zip(
				from(
					setDoc(cardReference, {
						...card[0],
						activeForSale: false,
					}),
				),
				from(this.$user.updateUser(user)),
				from(this.$log.createLog(LogTypes.PURCHASE, 'Purchased card')),
			);
		}

		return throwError(() => `Card not available for purchase`);
	}
}
