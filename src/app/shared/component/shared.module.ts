import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from 'src/app/core/service/notification.service';
import { NotificationComponent } from './notification/notification.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListModule } from 'src/app/modules/list/list.module';



@NgModule({
  declarations: [NotificationComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule, 
    MatIconModule,
    MatSidenavModule,    
    BrowserAnimationsModule, 
    MatToolbarModule,
    ListModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    FlexLayoutModule,
    MatCardModule,
    MatButtonModule,
    MatTabsModule,
    MatProgressBarModule,
  ],
  providers:[NotificationService],
  exports:[NotificationComponent]
})
export class SharedModule { }
