import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/login/login.component';
import { pageNotFoundComponent } from './modules/pageNotFound/pageNotFound.component';
import { DemoComponent } from './modules/demo/demo.component';
import { underConstruction } from './modules/underConstruction/underConstruction.component';
import { AuthGuard } from './core/authGuard/auth.guard';

const routes: Routes = [
  { path : 'login' , component: LoginComponent },
  { path : 'demo' , component: DemoComponent},
  { path : 'underConstruction', component : underConstruction},
  { path : 'home', loadChildren: () => import('./modules/home/home.module').then( m => m.HomeModule), canActivate :[AuthGuard]},
  { path : 'orders' , loadChildren : () => import('./modules/order/order.module').then ( m => m.OrderModule), canActivate :[AuthGuard]},
  { path : 'list',  loadChildren : () => import('./modules/list/list.module').then(m => m.ListModule), canActivate :[AuthGuard]},
  { path : 'dashboard', loadChildren : () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule), canActivate :[AuthGuard]},
  { path : 'products' , loadChildren : () => import('./modules/product/product.module').then( m => m.ProductModule), canActivate :[AuthGuard]},
  {path : 'my-account', loadChildren : () => import('./modules/my-account/my-account.module').then(m => m.MyAccountModule),  canActivate :[AuthGuard]},
  {path : 'expences', loadChildren : () => import('./modules/expences/expences.module').then(m => m.ExpencesModule),  canActivate :[AuthGuard]},
  //if url not found or match

  { path: '' , redirectTo : "/dashboard", pathMatch:'full'},
  {path: '**' , component: pageNotFoundComponent},
  { path: '404-not-found' , component : pageNotFoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
