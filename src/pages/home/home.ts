import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SessionsPage } from '../sessions/sessions';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

	onLogin(){
		//TODO: process log in info
		this.navCtrl.push(SessionsPage);
	}
}
