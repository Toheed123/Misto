import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './list/product-list.component';
import { ProductAddComponent } from './add/product-add.component';

const routes: Routes = [
  { path :'', component: ProductListComponent , children : [
    {path : 'add', component : ProductAddComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
