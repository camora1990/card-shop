import { Injectable } from '@angular/core';
import { doc, setDoc } from '@angular/fire/firestore';
import { uuidv4 } from '@firebase/util';
import {
	CollectionReference,
	Firestore,
	collection,
} from '@angular/fire/firestore';
import { LogTypes } from '../domain/enums/logTypes.model';
import { Log } from '../domain/entities/log.model';
import { ISODate } from '../domain/valueObject/date.model';
import { Auth, User } from '@angular/fire/auth';
import { UserService } from './user.service';
import { from, Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class LogService {
	private refCollectionLog: CollectionReference;
	constructor(private $fire: Firestore, private $user: UserService) {
		this.refCollectionLog = collection(this.$fire, 'logs');
	}

	createLog(type: LogTypes, description: string,currentUser:User=this.$user.currenUser!): Observable<void> {
		const logref = doc(this.refCollectionLog);
		return from(setDoc(logref, this.generateLog(type, description,currentUser)));
	}

	private generateLog(type: LogTypes, description: string, currentUser:User): Log {
		debugger
		return {
			description,
			timestamp: ISODate.now().ISOString,
			type,
			uid: uuidv4(),
			user: {
				avatar: currentUser?.photoURL!,
				email: currentUser?.email!,
				uid: currentUser?.uid!,
				username: currentUser?.displayName!,
			},
		};
	}
}
