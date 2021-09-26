import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateitemPage } from './createitem.page';

const routes: Routes = [
  {
    path: '',
    component: CreateitemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateitemPageRoutingModule {}
