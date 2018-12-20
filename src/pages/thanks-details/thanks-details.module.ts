import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ThanksDetailsPage } from './thanks-details';

@NgModule({
  declarations: [
    ThanksDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(ThanksDetailsPage),
  ],
})
export class ThanksDetailsPageModule {}
