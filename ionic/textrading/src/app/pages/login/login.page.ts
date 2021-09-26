import { Component, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import {DatabaseService} from '../../services/database-service.service';
import {AuthService} from '../../services/auth.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

import { ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit  {
  loginForm : FormGroup;
  mobilenumber: AbstractControl;
  pinnumber: AbstractControl;
  developer = {};
  developers = [];
 
  constructor(private formBuilder : FormBuilder, 
    private auth : AuthService, 
    private router: Router,
    private databaseprovider: DatabaseService, 

    public toastCtrl : ToastController,
  ){

  
    this.loginForm = this.formBuilder.group({
      'mobilenumber': [''],
      'pinnumber': ['']
    });
    this.mobilenumber = this.loginForm.controls['mobilenumber'];
    this.pinnumber = this.loginForm.controls['pinnumber'];
    

  }

  ngOnInit() {
    this.databaseprovider.getSession("session").then((val)=>{
      this.router.navigate(['home'])
 })
 
    
  }

  login(){

    console.log("form clicked");
    if(this.loginForm.valid){
      console.log("form valid");
      var credentials = ({mobilenumber : this.mobilenumber.value, 
      pinnumber : this.pinnumber.value});
      console.log(credentials)
      this.auth.loginMongoDB(credentials).subscribe(
        (data)=>{
          console.log("msg from : "+ data);
       
          this.loginToast("Login Successful");
          this.databaseprovider.setSession("session",data).then((val)=>{
               this.databaseprovider.setAuthState()
              
          })
          this.router.navigate(['home'])

 
          
        },
        (error)=>{
          console.log(error);
        },
        ()=>{
          console.log("call completed");
        }

      
      );
     

    }
  }

 


  loadSessionData(){
    this.databaseprovider.getSession("session").then(data => {
      this.developers = data;
    })
  }

  addSession() {
    this.databaseprovider.setSession("session",this.developer['session'])
    .then(data => {
      this.loadSessionData();
    });
    this.developer = {};
  }

  goToSignup(){
    this.router.navigate(['/SignupPage'])
    
  }

  async loginToast(msg) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present()
    
  }


}
