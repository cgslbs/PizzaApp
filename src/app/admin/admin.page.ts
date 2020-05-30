import { Component, OnInit } from '@angular/core';
import Pizza from '../models/Pizza';
import {PizzaService} from '../services/pizza.service';
import {NavigationExtras, Router} from '@angular/router';
import { AlertController } from '@ionic/angular';
import Ingredient from '../models/Ingredient';
import { PopoverController } from '@ionic/angular';
import { AddFormComponent } from '../add-form/add-form.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  listPizza: Array<Pizza> = new Array<Pizza>();
  listIngredient: Array<Ingredient> = new Array<Ingredient>();
  pizza: Pizza;
  ing: Ingredient;

  constructor(private pizzaService: PizzaService,
              private router: Router,
              public alertController: AlertController,
              public popoverController: PopoverController) { }

  ngOnInit() {
    this.getPizzas();
    this.getIngredient();
  }

  getPizzas() {
    this.pizzaService.getListPizza('pizza').subscribe(
        data => {
          for (const i of data) {
            this.listPizza.push(new Pizza(i));
          }}
    );
  }

  getIngredient() {
    this.pizzaService.getListIngredient('ingredient').subscribe(
        data => {
          for (const i of data) {
            this.listIngredient.push(new Ingredient(i));
          }}
    );
  }

  editIngredient(ing) {
    const navigationExtras: NavigationExtras = {
      state: {
        ing
      }
    };
    this.router.navigate(['/form-ing'], navigationExtras);

  }

  editPizza(pizza) {
    const navigationExtras: NavigationExtras = {
      state: {
        pizza
      }
    };
    this.router.navigate(['/form-pizza'], navigationExtras);
  }

  async deleteIngredient(ing, index) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Suppression',
      message: 'Etes-vous sur de vouloir supprimer la pizza ' + ing.nom + ' ?',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Supprimer',
          handler: () => {
             this.pizzaService.deleteIngredient(ing.id, 'ingredient').subscribe(
                () => {
                  this.listIngredient.splice(index, 1);
                  console.log('Ingredient supprimé');
                }
             );
          }
        }
      ]
    });

    await alert.present();
  }

  async deletePizza(pizza, index) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Suppression',
      message: 'Etes-vous sur de vouloir supprimer la pizza ' + pizza.nom + ' ?',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Supprimer',
          handler: () => {
            this.pizzaService.deletePizza(pizza.id, 'pizza').subscribe(
                () => {
                  this.listPizza.splice(index, 1);
                }
            );
          }
        }
      ]
    });
    await alert.present();
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: AddFormComponent,
      event: ev,
      translucent: true
    });
    return await popover.present();
  }


}
