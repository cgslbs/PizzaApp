import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {Camera} from '@ionic-native/camera/ngx';

import { IonicModule } from '@ionic/angular';

import { FormPizzaPage } from './form-pizza.page';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: FormPizzaPage
      }
    ])
  ],
  declarations: [FormPizzaPage],
  providers: [Camera]
})
export class FormPizzaPageModule {}
