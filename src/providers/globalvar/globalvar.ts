
import { Injectable } from '@angular/core';
import { DatabaseProvider } from '../database/database';

/*
  Generated class for the GlobalvarsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GlobalvarProvider {

  myGlobalVar: any;
  datacart:any;
  rows:any;
  constructor(public database:DatabaseProvider) { 
  this.myGlobalVar = ""; 
  this.datacart = "";
  } 
  
  setMyGlobalVar(value) { 
  this.myGlobalVar = value; 
  }
  
  getMyGlobalVar() { 
  return this.myGlobalVar; 
  } 

  // set_datacart(value){
  //   this.datacart = value
  // }
  
  // get_datacart(){
    
  //   return this.datacart;
  // }

  
  get_user(){
    this.database.all_user().then((res) => {
      this.rows = res;
      // console.log(this.rows.length);
      if(this.rows.rows.length > 0){
        return this.datacart = this.rows.rows.item(0);
      }else{
        return this.datacart = 0;
      }
    }, (e) => {
      // console.log(e);
      return this.datacart = 0;
    });
    
  }
}
