import { User } from './user.model';

export class LogMessage {
	
	constructor( public user:User,
		public msg: string,
		public type: string,
		public sendDate: string
	){}

}