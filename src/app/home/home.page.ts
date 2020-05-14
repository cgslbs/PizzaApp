import { Component } from '@angular/core';
import { PizzaService } from '../services/pizza.service';
import Pizza from '../models/Pizza';
import {NavigationExtras, Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage  {

  listPizza: Array<Pizza> = new Array<Pizza>();

  constructor(private pizzaService: PizzaService,
              private router: Router) {
    this.data();
  }
  data() {
    this.pizzaService.getListPizza('pizza').subscribe(
        data => {
          // tslint:disable-next-line:forin
          for (const i in data) {
            this.listPizza.push(new Pizza(data[i]));
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

}
