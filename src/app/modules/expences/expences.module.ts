import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';

import { ExpencesRoutingModule } from './expences-routing.module';
import { ExpencesAddComponent } from './add/expences-add.component';
import { ExpencesDetailsComponent } from './details/expences-details.component';
import { ExpencesListComponent } from './list/expences-list.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { ConfirmDialogModule } from 'src/app/shared/component/confirm-dialog/confirm-dialog.module';


@NgModule({
  declarations: [
    ExpencesAddComponent,
    ExpencesDetailsComponent,
    ExpencesListComponent
  ],
  imports: [
    CommonModule,
    ExpencesRoutingModule,
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
export class ExpencesModule { }
