
import { HistoryType } from '../enums/historyType.model';
import { UserDto } from './userDto';


export interface HistoryChange {
	uid: string;
	type: HistoryType;
	owner: UserDto;
}
