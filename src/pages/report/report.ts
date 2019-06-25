import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DetailReportPage } from '../detail-report/detail-report';

/**
 * Generated class for the ReportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-report',
  templateUrl: 'report.html',
})
export class ReportPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportPage');
  }

  open(id){
    if(id == 1){
      this.navCtrl.push(DetailReportPage, 'customer');
    }else if(id == 2){
      this.navCtrl.push(DetailReportPage, 'request');
    }else{
      this.navCtrl.push(DetailReportPage, 'appointment');
    }
  }

}
