import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductListComponent } from './list/product-list.component';
import {CurrencyPipe} from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ProductAddComponent } from './add/product-add.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ProductDetailComponent } from './detail/product-detail.component';


@NgModule({
  declarations: [
    ProductListComponent,
    ProductAddComponent,
    ProductDetailComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    MatTableModule,
    CurrencyPipe,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FlexLayoutModule,
    MatSidenavModule
  ]
})
export class ProductModule { }
