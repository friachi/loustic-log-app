import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LousticSessionPage } from '../loustic-session/loustic-session';
import { AuthService } from '../../services/auth';
import { AppManager } from '../../services/appmanager';
import { LousticSession } from '../../models/lousticsession.model';
import { LoadingController, AlertController } from 'ionic-angular';

import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-sessions',
  templateUrl: 'sessions.html',
})
export class SessionsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams , private authService: AuthService,
              private appManager: AppManager , private loadingCtrl: LoadingController ,private alertController: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SessionsPage');
  }

  onSettings(){
    console.log('onSettings clicked');
  }

  onAddSession(){

    const loading = this.loadingCtrl.create({
      content: 'Creating a new session...'
    });
    loading.present();

    const sessionRef = firebase.firestore().collection('sessions').doc() ;

    let newSession = new LousticSession();
    newSession.sessionRef = sessionRef.id;

    sessionRef.set(JSON.parse(JSON.stringify(newSession))).then (
      value => {
         loading.dismiss();
         this.appManager.activeSession = newSession;
         this.appManager.sessionsList.push(newSession);
         this.navCtrl.push(LousticSessionPage);
      }
      ).catch(
      reason => {
        loading.dismiss();
        const alert = this.alertController.create({
        title: 'Failed to create session!',
        message: reason.message,
        buttons: ['Ok']
      })
      alert.present();
      }
      );
  }

  onBack(){
     //logout
     this.authService.logout();
  }

}
