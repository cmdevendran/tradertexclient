import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ItemlistPageRoutingModule } from './itemlist-routing.module';

import { ItemlistPage } from './itemlist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ItemlistPageRoutingModule
  ],
  declarations: [ItemlistPage]
})
export class ItemlistPageModule {}
