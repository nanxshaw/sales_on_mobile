import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailAppointmentPage } from './detail-appointment';

@NgModule({
  declarations: [
    DetailAppointmentPage,
  ],
  imports: [
    IonicPageModule.forChild(DetailAppointmentPage),
  ],
})
export class DetailAppointmentPageModule {}
