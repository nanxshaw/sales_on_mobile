import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

import * as moment from 'moment';
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
  datas:any;
  items:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public rest : RestProvider) {
    this.data = navParams.data;
    if(this.data != ''){
      this.datas = this.data;
    }else{
      this.datas = { "name":"", "code":"", "product_type_id":"", "description":"" };
    }
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

  del(){
    let json = {
      "id" : this.datas.id,
    }
    this.rest.postRest('delete_product', json).then((res) => { 
    
      console.log(res);
      this.navCtrl.pop();
    
    },(err) => {
    });
  }

  done(){
    let json;
    let where;
    let date = moment().format("YYYY-MM-DD HH:mm:ss");
    if(this.data != ''){
      if(this.datas.product_type_id == ""){
        this.datas.product_type_id = this.data.id_type; 
      }
      json = {
        "id" : this.datas.id,
        "name" : this.datas.name,
        "code" : this.datas.code,
        "description" : this.datas.description,
        "product_type_id": this.datas.product_type_id,
        "updated_at" : date,
      }
      where = 'update_product';
    }else{

      json = {
        "name" : this.datas.name,
        "code" : this.datas.code,
        "description" : this.datas.description,
        "product_type_id": this.datas.product_type_id,
        "created_at" : date,
      }
      where = 'create_product';
    }
    console.log(JSON.stringify(json));
    this.rest.postRest(where, json).then((res) => { 
    
      console.log(res);
      this.navCtrl.pop();
    
    },(err) => {
    });
  }

  resize() {
      var element = this.myInput['_elementRef'].nativeElement.getElementsByClassName("text-input")[0];
      var scrollHeight = element.scrollHeight;
      element.style.height = scrollHeight + 'px';
      this.myInput['_elementRef'].nativeElement.style.height = (scrollHeight + 16) + 'px';
  }
}
