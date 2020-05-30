import { Component, OnInit } from '@angular/core';
import Pizza from '../models/Pizza';
import { ActivatedRoute, Router } from '@angular/router';
import {PizzaService} from '../services/pizza.service';
import Ingredient from '../models/Ingredient';
import {HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  pizza: Pizza;
  listIngredient: Array<Ingredient> = new Array<Ingredient>();

  constructor(private route: ActivatedRoute,
              private router: Router,
              private pizzaService: PizzaService) {
  }

  getIngredient() {
    this.pizzaService.getPizzaById('pizza', this.pizza.id).subscribe(
        data => {
          for (const i in this.pizza.ingredients) {
            this.listIngredient.push(new Ingredient(data[i]));
          }
        }
    );
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe( params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.pizza = this.router.getCurrentNavigation().extras.state.pizza;
      }
    });
    this.getIngredient();
  }
}
