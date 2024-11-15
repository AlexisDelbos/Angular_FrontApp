import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Training } from 'src/app/model/training.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: Training[] = [];
  total: number = 0;
  constructor(private cartService: CartService, private router : Router) { }

  ngOnInit(): void {
    this.cart = this.cartService.getCart();
    this.totalAmount(); 
  }

  onRemoveFromCart(training: Training): void {
    this.cartService.removeTraining(training);
    this.cart = this.cartService.getCart(); 
    this.totalAmount(); 
  }

  totalAmount(): void {
    this.total = this.cart.reduce((acc, training) => acc + (training.price * training.quantity), 0);
  }
  
  order(): void{
    this.router.navigateByUrl('customer');
  }
}
