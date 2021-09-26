import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateitemPageRoutingModule } from './createitem-routing.module';

import { ReactiveFormsModule } from '@angular/forms';

import { CreateitemPage } from './createitem.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CreateitemPageRoutingModule
  ],
  declarations: [CreateitemPage]
})
export class CreateitemPageModule {}
