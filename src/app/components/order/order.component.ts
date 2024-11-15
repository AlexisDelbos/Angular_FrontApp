import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Training } from 'src/app/model/training.model';
import { Customer } from 'src/app/model/customer.model';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  customer: Customer | undefined;
  cart: Training[] = [];
  total: number = 0;
  orderDate: string = new Date().toLocaleDateString();

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.customer = this.cartService.getCustomer(); 
    this.cart = this.cartService.getCart();         
    this.total = this.cartService.getTotal();       
  }

  confirmOrder(): void {
    alert("Aujourd'hui c'est gratuit, merci de votre visite :)");
  }
  
}
