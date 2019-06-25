import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { RestProvider } from '../../providers/rest/rest';
import * as moment from 'moment';

/**
 * Generated class for the DetailAppointmentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail-appointment',
  templateUrl: 'detail-appointment.html',
})
export class DetailAppointmentPage {

  @ViewChild('myInput') myInput: ElementRef;
  data:any;
  datas:any;
  cm:any;
  user:any;
  items:any;
  product:any;
  loadermsg:any;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public rest : RestProvider, 
    public db : DatabaseProvider,
    private loadingCtrl: LoadingController,
    public alertCtrl: AlertController) {
      this.data = navParams.data;
      if(this.data != ''){
        this.datas = this.data;
      }else{
        this.datas = { "start":"","end":"", "description":"" };
      }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailRequestPage');
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
      json = {
        "id" : this.datas.id,
        "start" : this.datas.start,
        "end" : this.datas.end,
        "description" : this.datas.description, 
        "customer_id" : this.user.rows.item(0).id_user,
        "updated_at" : date,
      };
      where = 'update_appointment';
    }else{
      json = { 
        "start" : this.datas.start,
        "end" : this.datas.end,
        "description" : this.datas.description, 
        "customer_id" : this.user.rows.item(0).id_user,
        "created_at" : date,
      };
      where = 'create_appointment';
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
  
  resize() {
      var element = this.myInput['_elementRef'].nativeElement.getElementsByClassName("text-input")[0];
      var scrollHeight = element.scrollHeight;
      element.style.height = scrollHeight + 'px';
      this.myInput['_elementRef'].nativeElement.style.height = (scrollHeight + 16) + 'px';
  }
}
