import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { DetailCustomerPage } from '../detail-customer/detail-customer';

/**
 * Generated class for the CustomerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-customer',
  templateUrl: 'customer.html',
})
export class CustomerPage {
  items:any;
  cari:any;
  cm:any;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public rest : RestProvider) {
  }

  ionViewWillEnter ()  {
    this.initializeItems();
    console.log('ionViewDidLoad CustomerPage');
  }

  initializeItems() {
    this.search();
  }

  tambah(){
    this.navCtrl.push(DetailCustomerPage, '');
  }

  search(){
    let $where; 
    if(this.cari != null){
      this.cari = this.cari;
      $where = 'show_customer?search='+this.cari;
    }else{
      this.cari = '';
      $where = 'show_customer';
    }

    this.rest.getRest($where).then((res) => { 
      this.cm = res;
      let data = [];
      for (let i = 0; i < this.cm.data.length; i++) {
        data.push(this.cm.data[i]);
      }
      this.items = data;
      console.log(this.items);
    });
  }
  
  OpenDetail(item){
    this.navCtrl.push(DetailCustomerPage, item);
  }
}
