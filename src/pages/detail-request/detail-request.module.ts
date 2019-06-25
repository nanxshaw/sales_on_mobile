import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailRequestPage } from './detail-request';

@NgModule({
  declarations: [
    DetailRequestPage,
  ],
  imports: [
    IonicPageModule.forChild(DetailRequestPage),
  ],
})
export class DetailRequestPageModule {}
