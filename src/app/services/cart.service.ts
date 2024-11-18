import { Injectable } from '@angular/core';
import { Training } from '../model/training.model';
import { Customer } from '../model/customer.model'; 


// Dire que c'est une injection et non une relation entre deux objets
// Le cart service fait l'injection et pour qu'on ait accès aux dépendances (type singleton) 

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
  localStorageCart : string = 'cart';

  constructor() { }

  addTraining(training: Training): void {
    if (training.quantity <= 0) {
      alert('La quantité doit etre supérieur a 0')
      return;
    }
    this.cart = this.getCart();

    if (this.cart.length > 0) {
      const isExistTraining = this.cart.findIndex(
        (i) => i.id === training.id
      );

      if (isExistTraining !== -1) {
        this.cart[isExistTraining].quantity += training.quantity;
      } else {
        this.cart.push(training);
      }
    } else {
      this.cart.push(training);
    }
    localStorage.setItem(
      this.localStorageCart,
      JSON.stringify(this.cart)
    );
  }


  getCart(): Training[] {
    try {
      const storage: string = localStorage.getItem(this.localStorageCart);
      return storage ? JSON.parse(storage) : [];
    } catch (error) {
      return [];
    }  
  }

  removeTraining(training: Training): void {
    const trainingsCart = this.getCart();
    const newCart = trainingsCart?.filter((item) => {
      return item.id !== training.id;
    });
    localStorage.setItem(this.localStorageCart, JSON.stringify(newCart));
    console.log('Article supprimé du panier  :', this.cart);
}

getCustomer(): Customer {
  try {
    const customerStorage: string = localStorage.getItem('customer');
    return customerStorage ? JSON.parse(customerStorage) : this.customer;
  } catch (error) {
    console.error('Erreur lors de la récupération du client depuis le localStorage :', error);
    return this.customer;
  }
}

setCustomer(customer: Customer): void {
  this.customer = customer;
  try {
    localStorage.setItem('customer', JSON.stringify(this.customer));
  } catch (error) {
    console.error('Erreur lors de la sauvegarde du client dans le localStorage :', error);
  }
}


  getTotal(): number {
    let total = 0;
    for (const training of this.cart) {
        total += training.price * training.quantity;
    }
    return total;
}

deleteCart() {
  localStorage.removeItem(this.localStorageCart);
}
}
