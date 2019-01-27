import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LousticSessionPage } from '../loustic-session/loustic-session';

/**
 * Generated class for the SessionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sessions',
  templateUrl: 'sessions.html',
})
export class SessionsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SessionsPage');
  }

  onSettings(){
    console.log('onSettings clicked');
  }

  onAddSession(){
    this.navCtrl.push(LousticSessionPage);
  }

  onBack(){
     //logout

     //pop
     this.navCtrl.pop();
  }

}
