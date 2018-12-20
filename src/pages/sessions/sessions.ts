import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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


	onNewSession(){
		console.log('new session clicked');
	}

  onSettings(){
    console.log('onSettings clicked');
  }
}
