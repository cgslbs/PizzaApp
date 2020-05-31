import { Component, OnInit } from '@angular/core';
import {PizzaService} from '../services/pizza.service';
import Ingredient from '../models/Ingredient';
import Pizza from '../models/Pizza';
import { ActivatedRoute, Router } from '@angular/router';
import {Camera, CameraOptions} from '@ionic-native/camera/ngx';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-form-pizza',
  templateUrl: './form-pizza.page.html',
  styleUrls: ['./form-pizza.page.scss'],
})
export class FormPizzaPage implements OnInit {

  hasChanged = false;
  lastId: number;
  title = '';
  pizza: Pizza;
  listIngredient: Array<Ingredient> = new Array<Ingredient>();
  listPizza: Array<Pizza> = new Array<Pizza>();
  isChecked: Array<number> = new Array<number>();

  constructor(private route: ActivatedRoute,
              private router: Router,
              private pizzaService: PizzaService,
              private camera: Camera,
              private modalController: ModalController) { }

  ngOnInit() {
    this.route.queryParams.subscribe( params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.pizza = this.router.getCurrentNavigation().extras.state.pizza;
        if (this.pizza.nom !== '') {
          this.title = 'Modifer la pizza';
          this.isChecked = this.pizza.ingredients;
        } else {
          this.title = 'Ajouter une pizza';
        }
      }
    });
    this.getListPizza();
    this.getIngredient();
  }

  onChange() {
    this.hasChanged = true;

  }

  getIngredient() {
    this.pizzaService.getListIngredient('ingredient').subscribe(
        data => {
          for (const i of data) {
            this.listIngredient.push(new Ingredient(i));
          }}
    );
  }

  editIngredient(id) {
    const index = this.isChecked.indexOf(id);
    if (index >= 0) {
      this.isChecked.splice(index, 1);
    } else {
      this.isChecked.push(id);
    }
    this.hasChanged = true;
  }

  submitPizza(pizza: Pizza) {
    let exist = false;
    for (const piz of this.listPizza) {
      if (piz.id === pizza.id) {
        exist = true;
        break;
      }
    }
    pizza.ingredients = this.isChecked;
    if (!exist) {
      // create
      pizza.id = this.getLastId();
      this.pizzaService.addPizza(pizza, 'pizza').subscribe(
          (res) => {
            console.log(res);
            this.router.navigate(['/admin']);
          }
      );
    } else {
      // update
      this.pizzaService.updatePizza(pizza, 'pizza').subscribe(
          (res) => {
            console.log(res);
            this.router.navigate(['/admin']);
          }
      );
    }
  }

  getListPizza() {
    this.pizzaService.getListPizza('pizza').subscribe(
        data => {
          for (const i of data) {
            this.listPizza.push(new Pizza(i));
          }}
    );
  }

  getLastId() {
    this.lastId = 0;
    for (const i in this.listPizza) {
      if (this.listPizza[i].id > this.lastId) {
        this.lastId = this.listPizza[i].id;
      }
    }
    return this.lastId + 1;
  }

  takePicture() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
    };

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      this.pizza.photo = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
      console.log(err);
    });
  }


}
