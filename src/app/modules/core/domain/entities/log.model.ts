import { LogTypes } from "../enums/logTypes.model";
import { ISODate } from "../valueObject/date.model";
import { UserDto } from './userDto';


export interface Log {
	uid: string;
	type: LogTypes;
	description: string;
	timestamp: string;
	user: UserDto
}
