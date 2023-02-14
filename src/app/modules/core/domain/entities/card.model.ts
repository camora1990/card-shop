import { HistoryChange } from './historyChange.model';

export interface Card {
	uid: string;
	activeForSale:boolean,
	name: string;
	description: string;
	price: number;
	imageUrl: string;
	history: HistoryChange[];
	idHero: string,
	power: number
}
