import { Injectable } from '@angular/core';
import { LousticSession } from '../models/lousticsession.model';
import { BandMember } from '../models/bandmember.model';
import { Song } from '../models/song.model';
import { Thanks } from '../models/thanks.model';
import { Location } from '../models/location.model';
import { User } from '../models/user.model';
import { LogMessage } from '../models/logmessage.model';

@Injectable()
export class AppManager {
	
	public activeUser: User = null;
	public sessionsList: LousticSession[] = [];
	public activeSession: LousticSession = null;

	constructor(){

	}

}