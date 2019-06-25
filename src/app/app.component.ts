import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { CustomerPage } from '../pages/customer/customer';
import { ProductPage } from '../pages/product/product';
import { RequestPage } from '../pages/request/request';
import { AppointmentPage } from '../pages/appointment/appointment';
import { ReportPage } from '../pages/report/report';
import { ProfilePage } from '../pages/profile/profile';
import { DatabaseProvider } from '../providers/database/database';
import { GlobalvarProvider } from '../providers/globalvar/globalvar';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any;
  menu:any;
  list:any;
  user:any;
  nama:any;
  email:any;
  val:any;
  constructor(platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    public globalvars:GlobalvarProvider,
    private database : DatabaseProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.menu_category();

      // database.init().then(() => {
      //   database.all_user().then((res) => {
      //     this.list = res;
      //     if(this.list.rows.length > 0){
      //       this.nama = this.list.rows.item(0).name;
      //       this.email = this.list.rows.item(0).email;
      //       this.rootPage = HomePage;
      //       this.globalvars.setMyGlobalVar(1);
      //     }else{
            this.rootPage = LoginPage;
        //     this.globalvars.setMyGlobalVar(0);
        //   }
        // });

        // },(reject) => {
        //   console.log("Init DB Failed : " + reject);
        // });
      });
  }

  profile(){
    this.database.all_user().then((res) => {
      this.list = res;
      console.log(this.list.rows.item(0));
      this.nav.push(ProfilePage, this.list.rows.item(0));
      
    });
  }

  menu_category(){
    this.menu =[
      {
        "name":"Home","icon":"home","log":"1"
      },
      {
        "name":"Customer","icon":"people","log":"2"
      },
      {
        "name":"Product","icon":"briefcase","log":"3"
      },
      {
        "name":"Request","icon":"pricetag","log":"4"
      },
      {
        "name":"Appointment","icon":"browsers","log":"5"
      },
      {
        "name":"Report","icon":"stats","log":"6"
      },
      {
        "name":"Log out","icon":"log-out","log":"7"
      }
    ]
  }

  open(id){
    if(id == 1){
      this.nav.setRoot(HomePage);
    }else if(id == 2){
      this.nav.push(CustomerPage);
    }else if(id == 3){
      this.nav.push(ProductPage);
    }else if(id == 4){
      this.nav.push(RequestPage);
    }else if(id == 5){
      this.nav.push(AppointmentPage);
    }else if(id == 6){
      this.nav.push(ReportPage);
    }else{
      this.database.delete_user().then((res) => {
        this.nav.setRoot(LoginPage);
      });
    }
  }
}

