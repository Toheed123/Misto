import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpencesListComponent } from './list/expences-list.component';
import { ExpencesAddComponent } from './add/expences-add.component';
import { ExpencesDetailsComponent } from './details/expences-details.component';

const routes: Routes = [
  { path : '', component: ExpencesListComponent, children : [
    { path : 'add', component : ExpencesAddComponent },
    { path : ':id', component : ExpencesDetailsComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpencesRoutingModule { }
