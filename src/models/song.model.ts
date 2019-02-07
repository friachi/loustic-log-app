import { LogMessage } from './logmessage.model';

export class Song {
	
public songRef: string = ''
public title: string = ''
public composedBy: string = ''
public lyricsBy: string = ''
public label: string = ''
//public publisher: string = ''
public lousticReleaseDate: string = ''
public isOriginal: string = 'original'
public signedContract: string = 'unsigned'
public contractLink: string = ''
public msgs: LogMessage[] = []

constructor(){}

}