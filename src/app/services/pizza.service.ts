import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import Pizza from '../models/Pizza';
import Ingredient from '../models/Ingredient';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PizzaService {

  endpoint = 'https://api.ynov.jcatania.io/';
  private data: any = [];
  constructor(private http: HttpClient) { }

  getListPizza(term: string) {
    const url = `${this.endpoint}${term}`;
    return this.http.get<Pizza[]>(url).pipe(
        map(value => {
          if (value.length > 0) {
            return value;
          } else {
            throw new Error ('Pas de données trouvées');
          }
        })
    );
  }
    getPizzaById(id: number) {
        const url = 'https://api.ynov.jcatania.io/pizza?id' + id;
        let data: Observable<any>;
        data = this.http.get(url);
        return data;
    }

    getListIngredient(term: string) {
    const url = `${this.endpoint}${term}`;
    return this.http.get<Ingredient[]>(url).pipe(
        map(value => {
            if (value.length > 0) {
                return value;
            } else {
                throw new Error ('Pas de données trouvées');
            }
        })
    );
  }


}
