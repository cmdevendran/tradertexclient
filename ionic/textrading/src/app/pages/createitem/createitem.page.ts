import { Component, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import {DatabaseService} from '../../services/database-service.service';
import {AuthService} from '../../services/auth.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ReactiveFormsModule} from '@angular/forms';


@Component({
  selector: 'app-createitem',
  templateUrl: './createitem.page.html',
  styleUrls: ['./createitem.page.scss'],
})
export class CreateitemPage implements OnInit {

  postitem : FormGroup;
  item_desc: AbstractControl;
  item_qty: AbstractControl;
  item_uom: AbstractControl;
  item_price: AbstractControl;
  item_cur: AbstractControl;
  item_cat: AbstractControl;
  item_remark: AbstractControl;

  categories : any;
  session : any;



  constructor(private formBuilder : FormBuilder, 
    private auth : AuthService, 
    private router: Router,
    private databaseprovider: DatabaseService,


    public toastCtrl : ToastController) { 
      this.postitem = this.formBuilder.group({
        item_desc : [''],
        item_qty : [''],
        item_uom : [''],
        item_price : [''],
        item_cur : [''],
        item_cat : [''],
        item_remark : ['']

      });
      this.item_desc = this.postitem.controls['item_desc'];
      this.item_qty = this.postitem.controls['item_qty'];
      this.item_uom = this.postitem.controls['item_uom'];
      this.item_price = this.postitem.controls['item_price'];
      this.item_cur = this.postitem.controls['item_cur'];

      this.item_cat = this.postitem.controls['item_cat'];
      this.item_remark = this.postitem.controls['item_remark'];



 
    }

    ngOnInit() {
      this.getCategories();
    }
  
  
    getCategories(){
      console.log("HOME PAGE nginitccc")
     
        this.databaseprovider.getSession("session").then(data => {
          this.session = data;
          console.log(this.session)
          this.auth.getCategories(this.session).subscribe(data=>{
            
            this.categories = data
            console.log(this.categories)
  
          })
        })
      
    }


  submit(trade){
    if(this.postitem.valid){
      var createitem ={};
      createitem ={
        item_desc : this.postitem.controls['item_desc'].value,
        item_qty : this.postitem.controls['item_qty'].value,
        item_uom : this.postitem.controls['item_uom'].value,
        item_price : this.postitem.controls['item_price'].value,
        item_cur : this.postitem.controls['item_cur'].value,
        item_cat : this.postitem.controls['item_cat'].value,
        item_remark : this.postitem.controls['item_remark'].value,
        item_trade : trade,
        item_postedby : this.session

      }
      console.log(createitem)
      this.auth.postAdvt(createitem).subscribe(data=>{
        console.log(data)
      })

    }




  }
tags = []
  onChange(val){
    console.log(this.tags)
  }

}
