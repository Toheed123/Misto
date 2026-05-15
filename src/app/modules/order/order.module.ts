import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { OrderListComponent } from './order-list.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    OrderListComponent
  ],
  imports: [
    CommonModule,
    OrderRoutingModule,
    FormsModule,
  ]
})
export class OrderModule { }
