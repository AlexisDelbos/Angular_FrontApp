import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from './services/authenticate.service';
import { Router } from '@angular/router';
import { CartService } from './services/cart.service';
import { User } from './model/user.model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  user : User;
  title = 'trainingS-front-app';
console: any;

  constructor(
    public authService: AuthenticateService,
    private router: Router,
    private cartService : CartService
  ) {}

  ngOnInit() {
    this.user = this.authService.getUser();

    console.log(this.authService.getUser());
 
    console.log(this.authService.isAdmin());
  }

  get panierCount(): number {
    return this.cartService.getCartCount();
  }


  onLogout() {
    this.authService.logout();
    this.router.navigateByUrl('trainings');
    console.log('logout');
  }
  
  isHomePage(): boolean {
    return this.router.url === '/home';
  }
}
