import { LogMessage } from './logmessage.model';

export class Song {
	
constructor(
public title: string,
public composedBy: string,
public lyricsBy: string,
public label: string,
public publisher: string,
public lousticReleaseDate: string,
public isOriginal: boolean,
public signedContract: boolean,
public contractLink: string,
public msgs: LogMessage[]
){}

}