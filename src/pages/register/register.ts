import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, MenuController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { DatabaseProvider } from '../../providers/database/database';
import { LoginPage } from '../login/login';
import * as moment from 'moment';
/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  user = {
    'name':'',
    'company':'',
    'position':'',
    'phone':'',
    'email':'',
    'password':'',
    're_password':'',
  };
  list:any;
  loadermsg:any;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public rest : RestProvider,
    private loadingCtrl: LoadingController,
    public alertCtrl: AlertController, 
    public menuCtrl: MenuController, 
    public db : DatabaseProvider) {
  }

  ionViewDidLoad() {
    this.menuCtrl.enable(false, 'mymenu');
    console.log('ionViewDidLoad RegisterPage');
  }

  showAlert(title, subtitle) {
    const alert = this.alertCtrl.create({
      title: title,
      subTitle: subtitle,
      buttons: ['OK']
    });
    alert.present();
  }

  register(){
    
    this.loadermsg = this.loadingCtrl.create({
      content: "Silakan tunggu..."
    });

    this.loadermsg.present();
    let date = moment().format("YYYY-MM-DD HH:mm:ss");
    console.log(date);
    let json = {
      "name" : this.user.name,
      "email" : this.user.email,
      "company" : this.user.company,
      "position" : this.user.position,
      "phone" : this.user.phone,
      "password" : this.user.password,
      "created_at" : date
    };
    console.log(json);
    if(this.user.password == this.user.re_password){
      this.rest.postRest('register', json).then((res) => { 
        this.list = res;
        if(this.list.message == "gagal"){
          this.loadermsg.dismiss();
          this.showAlert('Register','E-mail sudah digunakan');
        }else{
          this.loadermsg.dismiss();
          console.log(res);
          this.navCtrl.setRoot(LoginPage);
        }
      
      },(err) => {
        this.loadermsg.dismiss();
      });
    }else{

      this.showAlert('Register', 'Password anda tidak sama !');
    }
  }

  back(){
    this.navCtrl.pop();
  }

}
