import { Component, OnInit } from '@angular/core';
import {NavigationExtras, Router} from '@angular/router';
import Pizza from '../models/Pizza';
import Ingredient from '../models/Ingredient';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.scss'],
})
export class AddFormComponent implements OnInit {

  pizza: Pizza = new Pizza({
    nom: ''
  });
  ing: Ingredient = new Ingredient({
    nom: ''
  });

  constructor(private router: Router,
              private popoverController: PopoverController) { }

  ngOnInit() {
  }

  editPizza(pizza: Pizza) {
    this.close();
    const navigationExtras: NavigationExtras = {
      state: {
        pizza
      }
    };
    this.router.navigate(['/form-pizza'], navigationExtras);
  }

  editIngredient(ing: Ingredient) {
    this.close();
    const navigationExtras: NavigationExtras = {
      state: {
        ing
      }
    };
    this.router.navigate(['/form-ing'], navigationExtras);

  }

  close() {
    this.popoverController.dismiss({
      dismissed: true
    });
  }

}
