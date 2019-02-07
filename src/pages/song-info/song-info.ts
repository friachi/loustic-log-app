import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppManager } from '../../services/appmanager';
import { LousticSession } from '../../models/lousticsession.model';
import { Song } from '../../models/song.model';
import { LogMessage } from '../../models/logmessage.model';
import { User } from '../../models/user.model';
import firebase from 'firebase';
import { DrawerState } from 'ion-bottom-drawer';
 

@IonicPage()
@Component({
  selector: 'page-song-info',
  templateUrl: 'song-info.html',
})
export class SongInfoPage {

  private lousticSession: LousticSession = new LousticSession();
  private unsub;
  private song: Song = new Song();
  private user: User = new User('','');
  private msgs: LogMessage[] = [];
  drawerState = DrawerState.Docked;

  constructor(public navCtrl: NavController, public navParams: NavParams , private appManager: AppManager) {
  	this.song = this.appManager.activeSong;
  	this.user = this.appManager.activeUser;
  	this.lousticSession = this.appManager.activeSession;
    this.msgs = this.song.msgs;
    console.log('role ',this.user.role);
  }

  onSettings(){
    console.log('onSettings clicked');
  }

  onBack(){
    this.appManager.activeSession.songs.splice(this.appManager.activeSession.songs.findIndex( x => x.songRef === this.song.songRef),1,this.song);
     this.appManager.activeSong = null;
     this.navCtrl.pop();
  }

    ionViewWillEnter() {
    this.unsub = firebase.firestore().collection('sessions').doc(this.lousticSession.sessionRef).collection('songs').doc(this.song.songRef).onSnapshot(docSnapshot => {
          this.song = JSON.parse(JSON.stringify(docSnapshot.data())) ;
          this.appManager.activeSong = this.song;
     }, err => {
      console.log(`Encountered error: ${err}`);
      });
  }

  ionViewWillLeave(){
    this.unsub();
  }

    saveChange(prop:string , value:any){

      if(prop){
        var doc = firebase.firestore().collection('sessions').doc(this.lousticSession.sessionRef).collection('songs').doc(this.song.songRef);
        doc.update({
          [prop] : value
        }).then ( res => {})
        .catch(
      reason => { console.log('failed to update changes')});
      }
  }

  sendMsg( input: any) {
    let txt = input.value;
    const msg: LogMessage = new LogMessage(this.user,txt,'text','now');
    this.msgs.push(msg);
    input.value = '';
  }

  toggleDrawer(){
    if(this.drawerState === DrawerState.Docked) {
      this.drawerState = DrawerState.Top;
    }else {
      this.drawerState = DrawerState.Docked;
    }
  }

}
