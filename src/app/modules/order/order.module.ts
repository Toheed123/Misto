import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { ConfirmDialogModule } from 'src/app/shared/component/confirm-dialog/confirm-dialog.module';
import { OrderListComponent } from './list/order-list.component';
import { OrderAddComponent } from './add/order-add.component';
import { OrderDetailsComponent } from './details/order-details.component';
import { OrderInvoiceComponent } from './invoice/order-invoice.component';


@NgModule({
  declarations: [
    OrderListComponent,
    OrderAddComponent,
    OrderDetailsComponent,
    OrderInvoiceComponent
  ],
  imports: [
    CommonModule,
    OrderRoutingModule,
    FormsModule,
    MatTableModule,
    CurrencyPipe,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FlexLayoutModule,
    MatSidenavModule,
    MatDatepickerModule,
    MatSelectModule,
    MatNativeDateModule,
    ConfirmDialogModule
  ]
})
export class OrderModule { }
