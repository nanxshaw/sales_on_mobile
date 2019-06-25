import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

/**
 * Generated class for the DetailProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail-product',
  templateUrl: 'detail-product.html',
})
export class DetailProductPage {

  @ViewChild('myInput') myInput: ElementRef;
  data:any;
  cm:any;
  items:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public rest : RestProvider) {
    this.data = navParams.data;
  }

  ionViewDidLoad() {
    this.list();
    console.log('ionViewDidLoad DetailProductPage');
  }
  selected(id) {
    console.log(id);
    if (this.data.id_type == id) {
      return true;
    }else{
      return false;
    }

  }
  list(){
    this.rest.getRest('show_product_type').then((res) => { 
      this.cm = res;
      let data = [];
      for (let i = 0; i < this.cm.data.length; i++) {
        data.push(this.cm.data[i]);
      }
      this.items = data;
      console.log(this.items);
    });
  }

  resize() {
      var element = this.myInput['_elementRef'].nativeElement.getElementsByClassName("text-input")[0];
      var scrollHeight = element.scrollHeight;
      element.style.height = scrollHeight + 'px';
      this.myInput['_elementRef'].nativeElement.style.height = (scrollHeight + 16) + 'px';
  }
}
