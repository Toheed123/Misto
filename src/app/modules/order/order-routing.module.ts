import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderListComponent } from './list/order-list.component';
import { OrderAddComponent } from './add/order-add.component';
import { OrderDetailsComponent } from './details/order-details.component';
import { OrderInvoiceComponent } from './invoice/order-invoice.component';
// import { OrderListComponent } from './order-list.component';

const routes: Routes = [
  { path : '', component: OrderListComponent, children : [
      { path : 'add', component : OrderAddComponent },
      { path : 'edit/:id', component : OrderDetailsComponent},
      { path : 'invoice/:id', component : OrderInvoiceComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
