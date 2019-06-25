import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import * as moment from 'moment';
/**
 * Generated class for the DetailReportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail-report',
  templateUrl: 'detail-report.html',
})
export class DetailReportPage {

  data:any;
  m:any;
  y:any;
  year:any;
  mounth:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.data = navParams.data;
  }

  ionViewDidLoad() {
    this.bulan();
    this.tahun();
    console.log('ionViewDidLoad DetailReportPage');
  }

  bulan(){
    this.year = moment().format("YYYY");
    let data = [];
    for (let i = 1990; i <= this.year; i++) {
      data.push(i);
    }
    this.y = data;
  }

  tahun(){
    let data = [];
    for (let i = 1; i <= 12; i++) {
      data.push(i);
    }
    this.m = data;
  }

}
