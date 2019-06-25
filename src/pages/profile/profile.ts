import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { HomePage } from '../home/home';
import * as moment from 'moment';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  loadermsg:any;
  // user = {
  //   'name':'',
  //   'company':'',
  //   'position':'',
  //   'phone':'',
  //   'email':'',
  //   'new_password':'',
  // };
  pwd:any;
  user:any;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public rest : RestProvider,
    private loadingCtrl: LoadingController,
    public alertCtrl: AlertController) {
      this.user = navParams.data;
      console.log(this.user);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
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
    
    this.loadermsg = this.loadingCtrl.create({
      content: "Silakan tunggu..."
    });

    this.loadermsg.present();
    let date = moment().format("YYYY-MM-DD HH:mm:ss");
    let json = {
      "id" : this.user.id_user,
      "name" : this.user.name,
      "email" : this.user.email,
      "company" : this.user.company,
      "position" : this.user.position,
      "phone" : this.user.phone,
      "password" : this.pwd,
      "updated_at" : date
    };
    console.log(json);
      this.rest.postRest('ubah_password', json).then((res) => { 
      
        this.loadermsg.dismiss();
        console.log(res);
        this.navCtrl.setRoot(HomePage);
      
      },(err) => {
        this.loadermsg.dismiss();
      });
  }

  back(){
    this.navCtrl.pop();
  }

}
