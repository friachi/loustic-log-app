import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LousticSession } from '../../models/lousticsession.model';
import { Location } from '../../models/location.model';
import { AppManager } from '../../services/appmanager';
import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-location-details',
  templateUrl: 'location-details.html',
})
export class LocationDetailsPage {

	private lousticSession: LousticSession = new LousticSession();
  constructor(public navCtrl: NavController, public navParams: NavParams , private appManager: AppManager) {
  		this.lousticSession = this.appManager.activeSession;
  }

  onBack(){
     this.navCtrl.pop();
  }
  
  onSettings(){
    console.log('onSettings clicked');
  }

  saveChange(prop:string , value:any){

      if(prop){
        var doc = firebase.firestore().collection('sessions').doc(this.lousticSession.sessionRef);
        doc.update({
          [prop] : value
        }).then ( res => {})
        .catch(
      reason => { console.log('failed to update changes')});
      }
  }

}
