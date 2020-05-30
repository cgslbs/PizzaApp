import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import Pizza from '../models/Pizza';
import Ingredient from '../models/Ingredient';
import {map} from 'rxjs/operators';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PizzaService {

  mainUrl = 'https://api.ynov.jcatania.io/';
  httpOption = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) { }

    getUrl(term: string) {
        const url = `${this.mainUrl}${term}`;
        return url;

    }

  getListPizza(term: string): Observable<Pizza[]> {
      const url = this.getUrl(term);
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
    getPizzaById(term: string, id: number): Observable<Pizza[]> {
        const url = this.getUrl(term) + '?id=' + id;
        let data: Observable<any>;
        data = this.http.get(url);
        return data;
    }

    getListIngredient(term: string): Observable<Ingredient[]> {
      const url = this.getUrl(term);
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

  addPizza(pizza: Pizza, term: string): Observable<any> {
      const url = this.getUrl(term);
      return this.http.post<Pizza>(url, pizza, this.httpOption).pipe(
          catchError(this.handleError<Pizza>('Add Pizza'))
      );
  }

  updatePizza(pizza: Pizza, term: string): Observable<any> {
      const url = this.getUrl(term) + '/' + pizza.id;
      return this.http.patch(url, pizza, this.httpOption).pipe(
          tap(_ => console.log('Pizza updated')),
          catchError(this.handleError<Pizza[]>('Update Pizza'))
      );
  }

  deletePizza(id: number, term: string): Observable<Pizza[]> {
      const url = this.getUrl(term) + '/' + id;
      return this.http.delete<Pizza[]>(url, this.httpOption).pipe(
          tap(_ => console.log(`Pizza supprimée ${id}`)),
          catchError(this.handleError<Pizza[]>('Delete Pizza'))
      );
  }
  addIngredient(ing: Ingredient, term: string): Observable<any> {
      const url = this.getUrl(term);
      return this.http.post<Ingredient>(url, ing, this.httpOption).pipe(
          catchError(this.handleError<Ingredient>('Add Ingredient'))
      );
  }

  updateIngredient(ing: Ingredient, term: string): Observable<any> {
      const url = this.getUrl(term) + '/' + ing.id;
      return this.http.patch(url, ing, this.httpOption).pipe(
          tap(_ => console.log('Ingredient updated')),
          catchError(this.handleError<Ingredient[]>('Update Ingredient'))
      );
  }

  deleteIngredient(id: number, term: string): Observable<Ingredient[]> {
      const url = this.getUrl(term) + '/' + id;
      return this.http.delete<Ingredient[]>(url, this.httpOption).pipe(
          tap(_ => console.log(`Ingredient supprimée ${id}`)),
          catchError(this.handleError<Ingredient[]>('Delete Ingredient'))
      );
  }

private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
        console.error(error);
        console.log(`${operation} failed: ${error.message}`);
        return of(result as T);
    };
}

}
