import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DetailCustomerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail-customer',
  templateUrl: 'detail-customer.html',
})
export class DetailCustomerPage {
  data:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.data = navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailCustomerPage');
  }

}
