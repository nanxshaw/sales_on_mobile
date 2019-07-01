import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import 'rxjs/add/operator/map';
/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseProvider {

  private db : SQLiteObject;
  private isOpen: boolean = false;
  constructor(public storage: SQLite, private platform: Platform){
    this.platform.ready().then(()=>{
      this.init();
    });
  }

  init(){
    console.log(["DB INIT", this.db, this.isOpen]);

    return new Promise((resolve, reject) => {
      if(!this.isOpen){
        this.storage = new SQLite();
        this.storage.create({
          name:"data.db",
          location:"default"})
          .then((db:SQLiteObject) => { 
            this.db = db;
           db.executeSql("CREATE TABLE IF NOT EXISTS user (id_user INTEGER, email VARCHAR(40), position VARCHAR(40), password VARCHAR(40), name VARCHAR(40), phone VARCHAR(20), company TEXT )",[]);

            this.isOpen = true;
            resolve('ok');
          }).catch((error) => {
            console.log("DB ERROR: " + error);
            reject(error);
          })
      }
    });
  }

  tambah_user(data){   
    console.log(data.email);
    return new Promise((resolve, reject) => {
      this.db.executeSql('INSERT INTO user VALUES (?,?,?,?,?,?,?)',[data.id, data.email, data.position, data.password, data.name, data.phone, data.company])
      .then(res => {
        console.log(res);
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }
  
  update_user(data){   
    console.log(data.email);
    return new Promise((resolve, reject) => {
      this.db.executeSql('UPDATE user SET email=?, position=?, password=?, name=?, phone=?, company=? WHERE id_user=?',[data.email, data.position, data.password, data.name, data.phone, data.company, data.id])
      .then(res => {
        console.log(res);
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  delete_user(){   
    return new Promise((resolve, reject) => {
      this.db.executeSql('DELETE FROM user ',[])
      .then(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  all_user(){    
    return new Promise((resolve, reject) => {
      if( this.isOpen ) {
        this.db.executeSql('SELECT * FROM user',[])
        .then(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
      }
      else {
        reject("db not available");
      }
    });
  }
}
