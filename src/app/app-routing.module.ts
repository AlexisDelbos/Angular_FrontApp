import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './components/guard/admin.guard';
import { AdminComponent } from './components/admin/admin.component';
import { AuthGuard } from './components/guard/auth.guard';
import { CartComponent } from './components/cart/cart.component';
import { ConnexionComponent } from './components/connexion/connexion.component';
import { CustomerComponent } from './components/customer/customer.component';
import { OrderComponent } from './components/order/order.component';
import { TrainingsComponent } from './components/trainings/trainings.component';
import { UserComponent } from './components/user/user.component';
import { TrainingComponent } from './components/training/training.component';
import { HomeComponent } from './components/home/home.component';
import { AccountComponent } from './components/account/account.component';

const routes: Routes = [
  { path: 'trainings', component: TrainingsComponent },
  { path: 'cart', component: CartComponent },
  { path: 'customer', component: CustomerComponent },
  { path: 'order', component: OrderComponent },
  { path:'home', component: HomeComponent},
  { path: 'account', component: AccountComponent},
  { path: 'training/:trainingId',component: TrainingComponent, canActivate: [AdminGuard],},
  { path: 'admin', component: AdminComponent, canActivate: [AdminGuard] },
  { path: 'user', component: UserComponent, canActivate: [AuthGuard] },
  { path: 'connexion', component: ConnexionComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }, 
  { path: '**', redirectTo: 'connexion' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
