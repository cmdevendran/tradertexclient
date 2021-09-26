import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import {AuthService} from '../../services/auth.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import {DatabaseService} from '../../services/database-service.service'




@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup;
  isSubmitted = false;
  pinNumber1;
  pinNumber2;
  mobileNumber;


  constructor(public formBuilder: FormBuilder,
    private auth : AuthService, 
    private router: Router,
    private dbservice : DatabaseService,
    private toastCtrl:ToastController) { }

  ngOnInit() {

    this.registerForm = this.formBuilder.group({
      mobileNumber : ['', [Validators.required,Validators.maxLength(13),Validators.minLength(8), Validators.pattern('^[0-9]+$')]],
      pinNumber1: ['', [Validators.required, Validators.maxLength(8),Validators.minLength(8),Validators.pattern('^[0-9]+$')]],
      pinNumber2: ['', [Validators.required, Validators.maxLength(8),Validators.minLength(8),Validators.pattern('^[0-9]+$')]],
    })

    this.mobileNumber = this.registerForm.controls['mobileNumber'];
    this.pinNumber1 = this.registerForm.controls['pinNumber1'];
    this.pinNumber2 = this.registerForm.controls['pinNumber2'];

  }


  get errorControl() {
    return this.registerForm.controls;
  }

submitForm() {
  this.isSubmitted = true;

  if (!this.registerForm.valid) {
    console.log('Please provide all the required values!')
    return false;
  } else {
    if(this.validatePin()){
      console.log(this.registerForm)
      this.register();
    }

      
  }
}

validatePin(){
if(this.pinNumber1.value==this.pinNumber2.value){
console.log(this.pinNumber1, this.pinNumber2)
return true
}
else{
  console.log("false value")
  console.log(this.pinNumber1, this.pinNumber2)
  return false;

}
}

register(){
  if(this.registerForm.valid){
    var credentials = ({mobilenumber: this.mobileNumber.value, 
    pinnumber : this.pinNumber1.value});
    console.log(credentials)
    this.auth.registerNewUser(credentials).subscribe(
      (data)=>{
        console.log("msg from : "+ data);
     
        this.loginToast("Registration Successful");
            this.dbservice.setSession("session",data).then((val)=>{
            
        })
        this.router.navigate(['home'])
        
      },

(error)=>{
        console.log(error);
        this.loginToast(error.message);
      },  
      ()=>{
        console.log("call completed");
      }

    
    );
   

  }
}


async loginToast(msg) {
  const toast = await this.toastCtrl.create({
    message: msg,
    duration: 2000
  });
  toast.present()
  
}

}



/**
class Validators {
  static min(min: number): ValidatorFn
  static max(max: number): ValidatorFn
  static required(control: AbstractControl): ValidationErrors | null
  static requiredTrue(control: AbstractControl): ValidationErrors | null
  static email(control: AbstractControl): ValidationErrors | null
  static minLength(minLength: number): ValidatorFn
  static maxLength(maxLength: number): ValidatorFn
  static pattern(pattern: string | RegExp): ValidatorFn
}
 */
