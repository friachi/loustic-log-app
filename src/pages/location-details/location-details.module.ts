import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LocationDetailsPage } from './location-details';

@NgModule({
  declarations: [
    LocationDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(LocationDetailsPage),
  ],
})
export class LocationDetailsPageModule {}
