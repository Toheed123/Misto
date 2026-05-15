import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyAccountRoutingModule } from './my-account-routing.module';
import { MyAccountComponent } from './my-account.component';
import { FlexLayoutModule } from "@angular/flex-layout";
import {MatAccordion, MatExpansionModule} from '@angular/material/expansion';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [MyAccountComponent],
  imports: [
    CommonModule,
    MyAccountRoutingModule,
    FlexLayoutModule,
    MatExpansionModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
    MatDatepickerModule,
    MatButtonModule
]
})
export class MyAccountModule {

 
 }
