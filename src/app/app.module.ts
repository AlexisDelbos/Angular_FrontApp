import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TrainingsComponent } from './components/trainings/trainings.component';
import { FormsModule } from '@angular/forms';
import { CartService } from './services/cart.service';
import { CartComponent } from './components/cart/cart.component';
import { CustomerComponent } from './components/customer/customer.component';
import { CommonModule } from '@angular/common'; 
import { OrderComponent } from './components/order/order.component';

@NgModule({
  declarations: [
    AppComponent,
    TrainingsComponent,
    CartComponent,
    CustomerComponent,    
    OrderComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule
  ],
  providers: [CartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
