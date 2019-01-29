import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SessionsPage } from '../pages/sessions/sessions';
import { LocationDetailsPage } from '../pages/location-details/location-details';
import { LousticSessionPage } from '../pages/loustic-session/loustic-session';
import { BandDetailsPage } from '../pages/band-details/band-details';
import { ThanksDetailsPage } from '../pages/thanks-details/thanks-details';
import { AuthService } from '../services/auth';
import { AppManager } from '../services/appmanager';

 
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SessionsPage,
    LocationDetailsPage,
    LousticSessionPage,
    BandDetailsPage,
    ThanksDetailsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SessionsPage,
    LocationDetailsPage,
    LousticSessionPage,
    BandDetailsPage,
    ThanksDetailsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthService,
    AppManager,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
