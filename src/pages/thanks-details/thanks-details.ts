import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LousticSession } from '../../models/lousticsession.model';
import { Thanks } from '../../models/thanks.model';
import { AppManager } from '../../services/appmanager';
import { NgForm } from '@angular/forms';
import firebase from 'firebase';

/**
 * Generated class for the ThanksDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-thanks-details',
  templateUrl: 'thanks-details.html',
})
export class ThanksDetailsPage {

	private lousticSession: LousticSession = new LousticSession();
  private thanks: Thanks[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams , private appManager: AppManager) {
  		this.lousticSession = this.appManager.activeSession;
      this.thanks = this.lousticSession.thanks;
  }

  onBack(){
     this.navCtrl.pop();
  }
  
  onSettings(){
    console.log('onSettings clicked');
  }

  addThanks(form) {
      const thankYou = new Thanks(form.value.person , form.value.description);
      this.thanks.unshift(thankYou);

      var doc = firebase.firestore().collection('sessions').doc(this.lousticSession.sessionRef);
        doc.update({
          thanks : JSON.parse(JSON.stringify(this.thanks))
        }).then ( res => {
          this.appManager.activeSession.thanks = this.thanks;
        })
        .catch(
      reason => { console.log('failed to update changes')});
  }

}
