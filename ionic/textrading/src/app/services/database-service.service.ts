import { Injectable } from '@angular/core';
/*********************************** */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

authenticationState = new BehaviorSubject(false);
private _storage: Storage | null = null;


  constructor(  private storage : Storage,
   ) {
     this.init()

   }
   async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
  }

  public setSession(settingName,value){
    return this.storage.set(`${ settingName }`,value);

  }
  public async getSession(settingName){
    return await this.storage.get(`${ settingName }`);
  }
  public async removeSession(settingName){
    return await this.storage.remove(`${ settingName }`);
  }
  public clear() {
    this.storage.clear().then(() => {
      console.log('all keys cleared');
    });
  }

  public setAuthState(){
   
    this.authenticationState.next(true);
    console.log("Authstate  : " +this.isAuthenticated())
  }

  public isAuthenticated() {
    return this.authenticationState.value;
  }

}