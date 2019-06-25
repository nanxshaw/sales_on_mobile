import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailCustomerPage } from './detail-customer';

@NgModule({
  declarations: [
    DetailCustomerPage,
  ],
  imports: [
    IonicPageModule.forChild(DetailCustomerPage),
  ],
})
export class DetailCustomerPageModule {}
