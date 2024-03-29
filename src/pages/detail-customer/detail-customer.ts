import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import * as moment from 'moment';
import { DatabaseProvider } from '../../providers/database/database';

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
  datas:any;
  user:any;
  constructor(public navCtrl: NavController, 
    public rest : RestProvider, 
    public db : DatabaseProvider,
    public navParams: NavParams) {
    this.data = navParams.data;
    
    if(this.data != ''){
      this.datas = this.data;
    }else{
      this.datas = { "name":"", "position":"", "company":"", "phone":"", "email":"" };
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailCustomerPage');
  }

  del(){
    
    let json = {
      "id" : this.datas.id,
    }
    this.rest.postRest('delete_customer', json).then((res) => { 
    
      console.log(res);
      this.navCtrl.pop();
    
    },(err) => {
    });
  }

  done(){
    this.db.all_user().then((res) => {
      this.user = res;
    let json;
    let where;
    let date = moment().format("YYYY-MM-DD HH:mm:ss");
    if(this.data != ''){

      json = {
        "id" : this.datas.id,
        "name" : this.datas.name,
        "company" : this.datas.company,
        "position" : this.datas.position,
        "phone" : this.datas.phone,
        "email" : this.datas.email,
        "updated_at" : date,
        "id_user" : this.user.rows.item(0).id_user,
      }
      where = 'update_customer';
    }else{

      json = {
        "name" : this.datas.name,
        "company" : this.datas.company,
        "position" : this.datas.position,
        "phone" : this.datas.phone,
        "email" : this.datas.email,
        "created_at" : date,
        "id_user" : this.user.rows.item(0).id_user,
      }
      where = 'create_customer';
    }
    console.log(JSON.stringify(json));
    this.rest.postRest(where, json).then((res) => { 
    
      console.log(res);
      this.navCtrl.pop();
    
    },(err) => {
    });
    });
  }

}
