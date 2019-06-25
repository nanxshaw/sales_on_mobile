import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { CustomerPage } from '../customer/customer';
import { ProductPage } from '../product/product';
import { RequestPage } from '../request/request';
import { AppointmentPage } from '../appointment/appointment';
import { ReportPage } from '../report/report';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  menu:any;
  constructor(public navCtrl: NavController, public menuCtrl : MenuController) {
    this.menuCtrl.enable(true, 'mymenu');
    this.menu_category();
  }

  menu_category(){
    this.menu =[
      {
        "name":"Customer","image":"assets/icon/teamwork.png","size":"6","log":"1"
      },
      {
        "name":"Product","image":"assets/icon/product.png","size":"6","log":"2"
      },
      {
        "name":"Request","image":"assets/icon/request.png","size":"12","log":"3"
      },
      {
        "name":"Appointment","image":"assets/icon/calendar.png","size":"6","log":"4"
      },
      {
        "name":"Report","image":"assets/icon/diagram.png","size":"6","log":"5"
      }
    ]
  }

  open(id){
    if(id == 1){
      this.navCtrl.push(CustomerPage);
    }else if(id == 2){
      this.navCtrl.push(ProductPage);
    }else if(id == 3){
      this.navCtrl.push(RequestPage);
    }else if(id == 4){
      this.navCtrl.push(AppointmentPage);
    }else if(id == 5){
      this.navCtrl.push(ReportPage);
    }
  }
}
