import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BandDetailsPage } from './band-details';

@NgModule({
  declarations: [
    BandDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(BandDetailsPage),
  ],
})
export class BandDetailsPageModule {}
