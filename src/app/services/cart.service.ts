import { Injectable } from '@angular/core';
import { Training } from '../model/training.model';
import { Customer } from '../model/customer.model'; 

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: Training[] = [];
  private customer: Customer = {
    id: '',
    lastname: '',
    firstname: '',
    adress: '',
    mobileNumber: '',
    mail: '',
  };

  constructor() { }

  addTraining(training: Training): void {
    this.cart.push(training);
    console.log('Current cart:', this.cart);
  }

  getCart(): Training[] {
    return this.cart;
  }

  removeTraining(training: Training): void {
    this.cart = this.cart.filter(item => item.id !== training.id);
    console.log('Panier mis à jour :', this.cart);
}

  getCustomer(): Customer {
    return this.customer;
  }

  setCustomer(customer: Customer): void {
    this.customer = customer;
  }

  getTotal(): number {
    let total = 0;
    for (const training of this.cart) {
        total += training.price * training.quantity;
    }
    return total;
}

  clearCart(): void {
    this.cart = [];
    console.log('Panier vidé');
  }

  clearCustomer(): void {
    this.customer = {
      id: '',
      lastname: '',
      firstname: '',
      adress: '',
      mobileNumber: '',
      mail: '',
    };
    console.log('Customer supprimé');
  }
}
