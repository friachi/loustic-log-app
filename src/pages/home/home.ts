import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SessionsPage } from '../sessions/sessions';
import { LoadingController, AlertController } from 'ionic-angular';
import { AuthService } from '../../services/auth' ;
import { NgForm } from '@angular/forms';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController , private loadingCtrl: LoadingController , private authService: AuthService,
  	private alertController: AlertController) {

  }

	onLogin(form: NgForm){
		
		const loading = this.loadingCtrl.create({
			content: 'Logging you in...'
		});
		loading.present();
		this.authService.login(form.value.email , form.value.password)
		.then( data => 
		{
			loading.dismiss();
			this.navCtrl.push(SessionsPage);
		}
		)
		.catch( error => {
			loading.dismiss();
			const alert = this.alertController.create({
				title: 'Login failed!',
				message: error.message,
				buttons: ['Ok']
			})
			alert.present();
		}	
		);
	}

	onSettings() {

	}

	onForgotPassword() {

	}
}
