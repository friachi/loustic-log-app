import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , AlertController } from 'ionic-angular';
import { AppManager } from '../../services/appmanager';
import { LousticSession } from '../../models/lousticsession.model';
import { Song } from '../../models/song.model';
import { LocationDetailsPage } from '../location-details/location-details';
import { BandDetailsPage } from '../band-details/band-details';
import { ThanksDetailsPage } from '../thanks-details/thanks-details';
import { SongInfoPage } from '../song-info/song-info';
import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-loustic-session',
  templateUrl: 'loustic-session.html',
})
export class LousticSessionPage {

  private lousticSession: LousticSession = new LousticSession();
  private unsub;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  	private appManager: AppManager , private alertController : AlertController) {
    this.lousticSession = this.appManager.activeSession;
  }

    onSettings(){
    console.log('onSettings clicked');
  }

  ionViewWillEnter() {
    const oldSongs = this.appManager.activeSession.songs ;

    this.unsub = firebase.firestore().collection('sessions').doc(this.lousticSession.sessionRef).onSnapshot(docSnapshot => {
          this.lousticSession = JSON.parse(JSON.stringify(docSnapshot.data())) ;
          this.appManager.activeSession = this.lousticSession;

         if(!oldSongs.length){
          this.fetchSongs(null);
          }
          else{
            this.lousticSession.songs = oldSongs;
          }

     }, err => {
      console.log(`Encountered error: ${err}`);
      });

  }

    fetchSongs(event){
        firebase.firestore().collection('sessions').doc(this.lousticSession.sessionRef).collection('songs').get().then(
      snapshot => {
        this.lousticSession.songs = [];
        snapshot.forEach(doc => {
        let song:Song = JSON.parse(JSON.stringify(doc.data()));
        this.lousticSession.songs.push(song);
        });
        if(event) event.complete();
      }
      ).catch(err => {
        console.log('Error getting sessions',err);
        if(event) event.complete();
      });
  }

  ionViewWillLeave(){
    this.unsub();
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

  onBack(){
    this.appManager.sessionsList.splice(this.appManager.sessionsList.findIndex( x => x.sessionRef === this.appManager.activeSession.sessionRef),1,this.appManager.activeSession);
     this.appManager.activeSession = null;
     this.navCtrl.pop();
  }

  onAddSong(){
    var song = new Song();
    
    var doc = firebase.firestore().collection('sessions').doc(this.lousticSession.sessionRef).collection('songs').doc();
    song.songRef = doc.id ;
        doc.set(JSON.parse(JSON.stringify(song)))
        .then ( res => {
         this.lousticSession.songs.push(song);
         this.lousticSession.songsCount = this.lousticSession.songsCount + 1;
         this.saveChange('songsCount',this.lousticSession.songsCount);
         this.appManager.activeSession = this.lousticSession;

         this.appManager.activeSong = this.lousticSession.songs[this.lousticSession.songs.length -1];
         this.navCtrl.push(SongInfoPage);
        })
        .catch(
      reason => { console.log('failed to create new song')});
  }

  async promptDelete(song : Song , index : number){
      
          const alert = await this.alertController.create({
      title: 'Confirm!',
      message: 'Are you sure you want to delete this song?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        }, {
          text: 'Yes',
          handler: () => {
            firebase.firestore().collection('sessions').doc(this.lousticSession.sessionRef).collection('songs').doc(song.songRef).delete().then( res => {
                this.lousticSession.songs.splice(index,1);
                this.lousticSession.songsCount = this.lousticSession.songsCount - 1;
                this.saveChange('songsCount',this.lousticSession.songsCount);
                this.appManager.activeSession = this.lousticSession;

            }).catch( reason => {

            });
          }
        }
      ]
    });

    await alert.present();
  }

  selectedSong(index:number){
    this.appManager.activeSong = this.lousticSession.songs[index];
    this.navCtrl.push(SongInfoPage); 
  }

  goToLocationDetails(){
    this.navCtrl.push(LocationDetailsPage);
  }

  goToBandMembers(){
    this.navCtrl.push(BandDetailsPage);
  }

  goToThanks(){
    this.navCtrl.push(ThanksDetailsPage);
  }

}
