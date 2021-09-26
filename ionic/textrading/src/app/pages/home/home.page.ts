import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {DatabaseService} from '../../services/database-service.service';
import {AuthService} from '../../services/auth.service';
import { NavController } from '@ionic/angular';
import { ItemlistPage } from '../itemlist/itemlist.page';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
categories : any;
  constructor(private router: Router,
    private auth : AuthService, 
    private databaseprovider: DatabaseService,
    public nav: NavController ) { }


  ngOnInit() {
    this.getCategories();
  }

session : string; 

  getCategories(){
    console.log("HOME PAGE nginitccc")
   
      this.databaseprovider.getSession("session").then(data => {
        this.session = data;
        console.log("session : "+this.session);
        this.auth.getCategories(this.session).subscribe(data=>{
          
          this.categories = data
          console.log(this.categories)

        })
      })
    
  }

  getItem( params: any) {
    this.nav.navigateForward(['itemlist'], { state: params });
  }

items : any

  clickItem(item_id){
    console.log("itempage nginitccc")
   

    this.auth.getAllItems(this.session,item_id).subscribe(data=>{
      this.items = data;
      console.log(this.items)

    })
    this.getItem(this.items)
  }




 


  


}
