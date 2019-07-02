import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DetailAppointmentPage } from '../detail-appointment/detail-appointment';
import { RestProvider } from '../../providers/rest/rest';
import { DatabaseProvider } from '../../providers/database/database';

/**
 * Generated class for the AppointmentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-appointment',
  templateUrl: 'appointment.html',
})
export class AppointmentPage {
  items:any;
  cari:any;
  cm:any;
  user:any;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public rest : RestProvider,
    public db : DatabaseProvider) {
  }


  ionViewWillEnter () {
    this.search();  
  } 


  search(){
    this.db.all_user().then((result) => {
      this.user = result;
      let $where; 
      if(this.cari != null){
        this.cari = this.cari;
        $where = 'show_appointment?id='+this.user.rows.item(0).id_user+'&search='+this.cari;
      }else{
        this.cari = '';
        $where = 'show_appointment?id='+this.user.rows.item(0).id_user;
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
    });
  }

  tambah(){
    let item = '';
    this.navCtrl.push(DetailAppointmentPage, item);
  }
  
  OpenDetail(item){
    this.navCtrl.push(DetailAppointmentPage, item);
  }
}
