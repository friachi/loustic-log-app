import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SessionsPage } from '../sessions/sessions';
import { LoadingController, AlertController } from 'ionic-angular';
import { AuthService } from '../../services/auth' ;
import { NgForm } from '@angular/forms';
import { AppManager } from '../../services/appmanager';
import { User } from '../../models/user.model';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController , private loadingCtrl: LoadingController , private authService: AuthService,
  	private alertController: AlertController, private appManager: AppManager) {

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
			const mail = form.value.email;
			console.log('mail ', mail);
			const role = form.value.role;
			console.log('role ', role);
			this.appManager.activeUser = new User(mail, role);
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
