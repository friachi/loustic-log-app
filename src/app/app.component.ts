import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import firebase from 'firebase' ;

import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    var config = {
    apiKey: "AIzaSyBXIIUJrmxiWp5Tzw7kIS3az5o3dgHVs-A",
    authDomain: "loustic-log.firebaseapp.com",
    databaseURL: "https://loustic-log.firebaseio.com",
    projectId: "loustic-log",
    storageBucket: "loustic-log.appspot.com",
    messagingSenderId: "37045143310"
  };
  firebase.initializeApp(config);
  }
  
}

