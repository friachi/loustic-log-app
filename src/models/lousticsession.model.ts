import { Song } from './song.model';
import { BandMember } from './bandmember.model';
import { Location } from './location.model';
import { Thanks } from './thanks.model';

export class LousticSession {
	
	public sessionRef: string
	public band: string = ''
	public manager: string = ''
	public plannedDate : string = ''
	public startTime : string = ''
	public endTime : string = ''
	public bandMembers: BandMember[] = []
    public songs: Song[] = []
    public songsCount: number = 0;
	public thanks: Thanks[] = []
	public location: Location = new Location();
	public requestedBy: string = 'them';
	
	constructor(){}

}