import { Component } from '@angular/core';
import { PizzaService } from '../services/pizza.service';
import { CartService } from '../services/cart.service';
import Pizza from '../models/Pizza';
import {NavigationExtras, Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import CartItem from '../models/CartIem';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage  {

  listPizza: Array<Pizza> = new Array<Pizza>();
  cartItemCount: BehaviorSubject<number>;
  cart: Array<CartItem> = new Array<CartItem>();

  constructor(private pizzaService: PizzaService,
              private router: Router,
              private cartService: CartService) {
    this.data();
    this.cartItemCount = this.getCartItemCount();
    this.cart = this.cartService.getCart();
  }
  data() {
    this.pizzaService.getListPizza('pizza').subscribe(
        data => {
          for (const i of data) {
            this.listPizza.push(new Pizza(i));
          }}
    );
  }

  getDetails(pizza) {
    const navigationExtras: NavigationExtras = {
      state: {
        pizza
      }
    };
    this.router.navigate(['/details'], navigationExtras);
  }

  addToCart(pizza) {
    this.cartService.addToCart(pizza);
  }

  getCartItemCount() {
    return this.cartService.getCartItemCount();
  }

}
