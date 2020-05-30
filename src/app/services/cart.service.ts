import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import CartItem from '../models/CartIem';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart: Array<CartItem> = new Array<CartItem>();
  private cartItemCount = new BehaviorSubject(0);
  constructor() { }

  getCart() {
    return this.cart;
  }

  addToCart(product: CartItem) {
    let added = false;
    for (const p of this.cart) {
        if (p.id === product.id) {
          p.quantity += 1;
          added = true;
          break;
        }
      }
    if (!added) {
      product.quantity = 1;
      this.cart.push( new CartItem(product));
    }
    this.cartItemCount.next(this.cartItemCount.value + 1);
  }

  getCartItemCount() {
    return this.cartItemCount;
  }

  removeFromCart(product: CartItem) {
    for (const [index, p] of this.cart.entries()) {
      if (p.id === product.id) {
        this.cartItemCount.next(this.cartItemCount.value - product.quantity);
        this.cart.splice(index, 1);
      }
    }
  }

  decreaseCartItem(product: CartItem) {
    for (const [index, p] of this.cart.entries()) {
      if (p.id === product.id) {
        p.quantity -= 1;
        if (p.quantity === 0) {
          this.cart.splice(index, 1);
        }
      }
    }
    this.cartItemCount.next(this.cartItemCount.value - 1);
  }

}
