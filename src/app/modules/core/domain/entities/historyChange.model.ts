
import { HistoryType } from '../enums/historyType.model';
import { UserModel } from './user.model';

export interface HistoryChange {
	uid: string;
	type: HistoryType;
	owner: UserModel;
}
