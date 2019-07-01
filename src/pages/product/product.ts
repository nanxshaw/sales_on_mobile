import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DetailProductPage } from '../detail-product/detail-product';
import { RestProvider } from '../../providers/rest/rest';

/**
 * Generated class for the ProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product',
  templateUrl: 'product.html',
})
export class ProductPage {
  items:any;
  cari:any;
  cm:any;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public rest : RestProvider) {
  }
  
  ionViewWillEnter () {
    this.initializeItems();
  }

  initializeItems() {
    this.search();
  }

  search(){
    let $where; 
    if(this.cari != null){
      this.cari = this.cari;
      $where = 'show_product?search='+this.cari;
    }else{
      this.cari = '';
      $where = 'show_product';
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
    this.navCtrl.push(DetailProductPage, item);
  }

  tambah(){
    this.navCtrl.push(DetailProductPage, '');
  }
}
