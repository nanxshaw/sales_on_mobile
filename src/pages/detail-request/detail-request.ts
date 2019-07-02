import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import * as moment from 'moment';
import { DatabaseProvider } from '../../providers/database/database';

/**
 * Generated class for the DetailRequestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail-request',
  templateUrl: 'detail-request.html',
})
export class DetailRequestPage {

  @ViewChild('myInput') myInput: ElementRef;
  data:any;
  cm:any;
  cm2:any;
  user:any;
  items:any;
  items2:any;
  product:any;
  datas:any;
  loadermsg:any;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public rest : RestProvider, 
    public db : DatabaseProvider,
    private loadingCtrl: LoadingController,
    public alertCtrl: AlertController) {
      this.data = navParams.data;
      console.log(this.data);
      if(this.data != ''){
        this.datas = this.data;
      }else{
        this.datas = { "qty":"", "description":"", "customer":"" };
      }
  }

  ionViewDidLoad() {
    this.list();
    this.list_customer();
    console.log('ionViewDidLoad DetailRequestPage');
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
    this.rest.getRest('show_product').then((res) => { 
      this.cm = res;
      let data = [];
      for (let i = 0; i < this.cm.data.length; i++) {
        data.push(this.cm.data[i]);
      }
      this.items = data;
      console.log(this.items);
    });
  }

  
  list_customer(){
    this.db.all_user().then((result) => {
      this.user = result;
    this.rest.getRest('show_customer?id='+this.user.rows.item(0).id_user).then((res) => { 
      this.cm2 = res;
      let data = [];
      for (let i = 0; i < this.cm2.data.length; i++) {
        data.push(this.cm2.data[i]);
      }
      this.items2 = data;
      console.log(this.items);
    });
    });
  }

  showAlert(title, subtitle) {
    const alert = this.alertCtrl.create({
      title: title,
      subTitle: subtitle,
      buttons: ['OK']
    });
    alert.present();
  }
  done(){
    
    this.db.all_user().then((res) => {
    this.user = res;
    this.loadermsg = this.loadingCtrl.create({
      content: "Silakan tunggu..."
    });

    this.loadermsg.present();
    let date = moment().format("YYYY-MM-DD HH:mm:ss");
    let json;
    let where;
    if(this.data != ''){
      if(this.product != null){ 
        this.product = this.product;
      }else{
        this.product = this.data.product_id;
      }
      json = {
        "id" : this.datas.requesth_id,
        "product_id" : this.product,
        "qty" : this.datas.qty,
        "description" : this.datas.description, 
        "customer_id" : this.datas.customer,
        "updated_at" : date,
        "id_user" : this.user.rows.item(0).id_user,
      };
      where = 'update_request';
    }else{
      json = { 
        "product_id" : this.product,
        "qty" : this.datas.qty,
        "customer_id" : this.datas.customer,
        "description" : this.datas.description, 
        "created_at" : date,
        "id_user" : this.user.rows.item(0).id_user,
      };
      console.log(json);
      where = 'create_request';
    }
    console.log(JSON.stringify(json));
      this.rest.postRest(where, json).then((res) => { 
      
        this.loadermsg.dismiss();
        console.log(res);
        this.navCtrl.pop();
      
      },(err) => {
        this.loadermsg.dismiss();
      });
    });
  }
  
  del(){
    
    let json = {
      "id" : this.datas.requesth_id,
    };
    this.rest.postRest('delete_request', json).then((res) => { 
    
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
