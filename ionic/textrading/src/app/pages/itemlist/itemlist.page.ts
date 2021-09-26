import { Component, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import {DatabaseService} from '../../services/database-service.service';
import {AuthService} from '../../services/auth.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-itemlist',
  templateUrl: './itemlist.page.html',
  styleUrls: ['./itemlist.page.scss'],
})
export class ItemlistPage implements OnInit {
  item_id : any;
  items : any;

  constructor( private auth : AuthService, 
    private router: Router,
    private databaseprovider: DatabaseService, 
   ) {
    console.log("STarting constructor.....")
    if (router.getCurrentNavigation().extras.queryParams) {
      this.items = this.router.getCurrentNavigation().extras.queryParams;
      console.log("state : "+ this.items) 
    }
    //this.getitemlist()

    }

  ngOnInit() {

    console.log("STarting init .....")

  }

  getitemlist(){
    console.log("itempage nginitccc")
   
      this.databaseprovider.getSession("session").then(data => {
        var session = data;
        this.auth.getAllItems(session,this.item_id).subscribe(data=>{
          this.items = data;

        })
        
      })
    
  }


}
