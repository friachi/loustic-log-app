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
import { SongInfoPage } from '../pages/song-info/song-info';
import { AuthService } from '../services/auth';
import { AppManager } from '../services/appmanager';
import { LongPressModule } from 'ionic-long-press';
import { IonBottomDrawerModule } from 'ion-bottom-drawer';

 
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SessionsPage,
    LocationDetailsPage,
    LousticSessionPage,
    BandDetailsPage,
    ThanksDetailsPage,
    SongInfoPage
  ],
  imports: [
    BrowserModule,
    LongPressModule,
    IonBottomDrawerModule,
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
    ThanksDetailsPage,
    SongInfoPage
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
