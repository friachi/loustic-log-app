import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LousticSessionPage } from '../loustic-session/loustic-session';
import { AuthService } from '../../services/auth';
import { AppManager } from '../../services/appmanager';
import { LousticSession } from '../../models/lousticsession.model';
import { Song } from '../../models/song.model';
import { LoadingController, AlertController } from 'ionic-angular';

import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-sessions',
  templateUrl: 'sessions.html',
})
export class SessionsPage {

  loadedSessions: LousticSession[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams , private authService: AuthService,
              private appManager: AppManager , private loadingCtrl: LoadingController ,private alertController: AlertController) {
    this.fetchSessions(null);
  }

  onSettings(){
    console.log('onSettings clicked');
  }

  ionViewWillEnter(){
    this.loadedSessions = this.appManager.sessionsList;
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
         this.appManager.sessionsList.unshift(this.appManager.activeSession);
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

  fetchSessions(event){
    firebase.firestore().collection('sessions').get().then(
      snapshot => {
        this.loadedSessions = [];
        snapshot.forEach(doc => {
        console.log(doc.data());
        let session:LousticSession = JSON.parse(JSON.stringify(doc.data()));
        this.loadedSessions.push(session);
        });
        this.appManager.sessionsList = this.loadedSessions;
        if(event) event.complete();
      }
      ).catch(err => {
        console.log('Error getting sessions',err);
        if(event) event.complete();
      });
  }

  selectedSession(index:number){
    this.appManager.activeSession = this.loadedSessions[index];
    this.navCtrl.push(LousticSessionPage);
  }

  async promptDelete(session: LousticSession , index : number) {
      
          const alert = await this.alertController.create({
      title: 'Confirm!',
      message: 'Are you sure you want to delete this session?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        }, {
          text: 'Yes',
          handler: () => {

            //delete songs first
            firebase.firestore().collection('sessions').doc(session.sessionRef).collection('songs').get().then(
      snapshot => {
        let songs:Song[] = [];
        snapshot.forEach(doc => {
        let song:Song = JSON.parse(JSON.stringify(doc.data()));
        songs.push(song);
        });
        songs.forEach( song => {
          firebase.firestore().collection('sessions').doc(session.sessionRef).collection('songs').doc(song.songRef).delete().then( res => {})
          .catch( reason => {});});
      })
            .catch(err => {});

            firebase.firestore().collection('sessions').doc(session.sessionRef).delete().then( res => {
                this.loadedSessions.splice(index,1);
            }).catch( reason => {

            });
          }
        }
      ]
    });

    await alert.present();
  }

}
