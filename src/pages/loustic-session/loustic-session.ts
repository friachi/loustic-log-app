import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppManager } from '../../services/appmanager';
import { LousticSession } from '../../models/lousticsession.model';
import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-loustic-session',
  templateUrl: 'loustic-session.html',
})
export class LousticSessionPage {

  private lousticSession: LousticSession = new LousticSession();

  constructor(public navCtrl: NavController, public navParams: NavParams,
  	private appManager: AppManager) {
    this.lousticSession = this.appManager.activeSession;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LousticSessionPage');
  }

    onSettings(){
    console.log('onSettings clicked');
  }

/*  sessionWasUpdated(property:string){
    console.log(property + ' was updated');
    console.log(this.lousticSession.band);
  }
  */

  saveChange(){
        const doc = firebase.firestore().collection('sessions').doc(this.lousticSession.sessionRef);
        doc.set(JSON.parse(JSON.stringify(this.lousticSession))).then ().catch(
      reason => { console.log('failed to update changes')});
  }

  onBack(){
     this.appManager.activeSession = null;
     this.navCtrl.pop();
  }

  onAddSong(){

  }

}
