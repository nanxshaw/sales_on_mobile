import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, MenuController, Events } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { RestProvider } from '../../providers/rest/rest';
import { DatabaseProvider } from '../../providers/database/database';
import { HomePage } from '../home/home';
import { GlobalvarProvider } from '../../providers/globalvar/globalvar';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  user = { 'email':'', 'password':'' };
  cm:any;
  ev:any;
  lgn:any;
  list:any;
  loadermsg:any;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public rest : RestProvider,
    public events: Events,
    private loadingCtrl: LoadingController,
    public alertCtrl: AlertController, 
    public globalvars:GlobalvarProvider,
    public menuCtrl: MenuController, 
    public db : DatabaseProvider) {
  }

  ionViewDidLoad() {
    this.menuCtrl.enable(false, 'mymenu');
    this.show_company();
    console.log('ionViewDidLoad LoginPage');
  }

  showAlert(title, subtitle) {
    const alert = this.alertCtrl.create({
      title: title,
      subTitle: subtitle,
      buttons: ['OK']
    });
    alert.present();
  }

  login(){
    
    this.loadermsg = this.loadingCtrl.create({
      content: "Silakan tunggu..."
    });

    this.loadermsg.present();
    let json = {
      "email" : this.user.email,
      "password" : this.user.password,
    };
    console.log(json);
    this.rest.postRest('login', json).then((res) => { 
      
      this.loadermsg.dismiss();
      this.lgn = res;
      this.updateUserInfo(this.lgn.data[0]);
      if( this.lgn.success != true ) {
        this.showAlert('Login', this.lgn.message);
      }else{
        this.db.tambah_user(this.lgn.data[0]).then((res2) => {
          console.log(res2);
          this.globalvars.setMyGlobalVar(1);
          this.showAlert('Login', 'Login Berhasil');
          this.navCtrl.setRoot(HomePage);
        });
        this.navCtrl.setRoot(HomePage);
      }
    
    },(err) => {
      console.log(err);
      this.loadermsg.dismiss();
      this.showAlert('Login', 'Username / Password Anda Salah');
    });
  }

  register(){
    this.navCtrl.push(RegisterPage);
  }

  show_company(){
    
    this.rest.getRest('show_user').then((res) => { 
      this.ev = [];
      this.cm = res;
      console.log(this.cm.data.length);
      for (let i = 0; i < this.cm.data.length; i++) {
        this.ev.push({ 'company':this.cm.data[i].company });
      }
      
    });
  }

  updateUserInfo(user){
    this.events.publish('user:created', user);
   }
}
