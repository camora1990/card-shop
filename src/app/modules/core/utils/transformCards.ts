import { Card } from '../domain/entities/card.model';
import { CardGroupBy } from '../domain/entities/cardGroupBy.model';

export default class TransformCard {
	public static transformData(cards: Card[]): CardGroupBy[] {
		const idHero = Array.from(new Set(cards.map((e) => e.idHero)));
		return idHero
			.reduce((ant: CardGroupBy[], act: string) => {
				const heroes = cards.filter((e) => e.idHero == act);
				ant = [
					...ant,
					{
						idHero: Number(act),
						quantity: heroes.length,
						hero: heroes[0],
					},
				];
				return ant;
			}, [])
			.sort((a, b) => a.hero.power - b.hero.power);
	}
}
