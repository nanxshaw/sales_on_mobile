import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Pipe, PipeTransform } from '@angular/core';
import { Chart } from 'chart.js';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import * as moment from 'moment';
import { RestProvider } from '../../providers/rest/rest';
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

  @ViewChild('barCanvas') barCanvas;

  barChart: any;
  data:any;
  cm:any;
  cus:any;
  items:any;
  item:any;
  in = {"m":"", "y":""};
  m:any;
  y:any;
  year:any;
  mounth:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public rest : RestProvider) {
    this.data = navParams.data;
    console.log(this.data);
    if(this.in.m <= '9'){
      this.in.m = '0'+this.in.m;
    }
  }

  ionViewDidLoad() {
    this.bulan();
    this.tahun();
    console.log('ionViewDidLoad DetailReportPage');
  }
  onChange(){
    if(this.data == 'customer'){
      this.grafik_customer();
    }else if(this.data == 'request'){
      this.grafik_request();
    }else{
      this.grafik_appointment();
    }
  }

  customer(){
    return new Promise((resolve, reject) => {
    this.rest.getRest('show_customer_group').then((res) => { 
      this.cm = res;
      let data = [];
      for (let i = 0; i < this.cm.data.length; i++) {
        let val = this.cm.data[i].create_date.split('-');
        console.log(val[0]);
        this.cm.data[i].tahun = val[0];
        this.cm.data[i].bulan = val[1];
        this.cm.data[i].tgl = val[2];
        data.push(this.cm.data[i]);
      }
      this.items = data;
      resolve(this.items);
    });
    });
  }

  request(){
    return new Promise((resolve, reject) => {
    this.rest.getRest('show_request_group').then((res) => { 
      this.cm = res;
      let data = [];
      for (let i = 0; i < this.cm.data.length; i++) {
        let val = this.cm.data[i].create_date.split('-');
        console.log(val[0]);
        this.cm.data[i].tahun = val[0];
        this.cm.data[i].bulan = val[1];
        this.cm.data[i].tgl = val[2];
        data.push(this.cm.data[i]);
      }
      this.items = data;
      resolve(this.items);
    });
    });
  }

  appointment(){
    return new Promise((resolve, reject) => {
    this.rest.getRest('show_appointment_group').then((res) => { 
      this.cm = res;
      let data = [];
      for (let i = 0; i < this.cm.data.length; i++) {
        let val = this.cm.data[i].create_date.split('-');
        console.log(val[0]);
        this.cm.data[i].tahun = val[0];
        this.cm.data[i].bulan = val[1];
        this.cm.data[i].tgl = val[2];
        data.push(this.cm.data[i]);
      }
      this.items = data;
      resolve(this.items);
    });
    });
  }
  
  grafik_customer(){
    
    this.customer().then((res) => {
      console.log(res);
      this.cus = res;
      let data = [];
      let s = [];

      for (let i = 0; i < this.cus.length; i++) {
        if(this.in.m == this.cus[i].bulan && this.in.y == this.cus[i].tahun){
            data.push(this.cus[i].tgl);
            s.push(this.cus[i].count);
        }
      }
      console.log(data);
      console.log(s);
      this.barChart = new Chart(this.barCanvas.nativeElement, {

        type: 'bar',
        data: {
            labels: data,
            datasets: [{
                label: this.data,
                data: s,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
  
      });
    });
  }

  grafik_request(){
    
    this.request().then((res) => {
      console.log(res);
      this.cus = res;
      let data = [];
      let s = [];

      for (let i = 0; i < this.cus.length; i++) {
        if(this.in.m == this.cus[i].bulan && this.in.y == this.cus[i].tahun){
            data.push(this.cus[i].tgl);
            s.push(this.cus[i].count);
        }
      }
      console.log(data);
      console.log(s);
      this.barChart = new Chart(this.barCanvas.nativeElement, {

        type: 'bar',
        data: {
            labels: data,
            datasets: [{
                label: this.data,
                data: s,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
  
      });
    });
  }

  
  grafik_appointment(){
    
    this.appointment().then((res) => {
      console.log(res);
      this.cus = res;
      let data = [];
      let s = [];

      for (let i = 0; i < this.cus.length; i++) {
        if(this.in.m == this.cus[i].bulan && this.in.y == this.cus[i].tahun){
            data.push(this.cus[i].tgl);
            s.push(this.cus[i].count);
        }
      }
      console.log(data);
      console.log(s);
      this.barChart = new Chart(this.barCanvas.nativeElement, {

        type: 'bar',
        data: {
            labels: data,
            datasets: [{
                label: this.data,
                data: s,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
  
      });
    });
  }
  tahun(){
    this.year = moment().format("YYYY");
    let data = [];
    for (let i = 1990; i <= this.year; i++) {
      data.push(i);
    }
    data.sort();
    data.reverse();
    this.y = data;
  }

  bulan(){
    let data = [];
    for (let i = 1; i <= 12; i++) {
      data.push(i);
    }
    this.m = data;
  }
}
