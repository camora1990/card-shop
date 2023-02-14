import * as moment from 'moment';

export class ISODate {
	public ISOString: string;

	public constructor(string: string) {
		this.ISOString = string;
	}

	public static toDate(string: string): Date {
		return new Date(string);
	}

	public static now(): ISODate {
		return new ISODate(new Date().toISOString());
	}

	public static verifyDate(first: string, second: string) {
		return (
			moment(this.toDate(first).toISOString()).format('MM-DD-YYYY') ===
			moment(this.toDate(second).toISOString()).format('MM-DD-YYYY')
		);
	}
}
