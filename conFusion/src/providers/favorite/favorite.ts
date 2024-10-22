import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Dish } from '../../shared/dish';
import { Observable } from 'rxjs/Observable';
import { DishProvider } from '../dish/dish';
import { map } from 'rxjs/operators';
import { Storage } from '@ionic/storage';

/*
  Generated class for the FavoriteProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FavoriteProvider {

  favorites: Array<any>;
  constructor(public http: HttpClient, private dishservice: DishProvider,
              private storage: Storage) {

    console.log('Hello FavoriteProvider Provider');
    
    this.favorites = [];

    storage.get('favorites').then(favorites => {
      if(favorites){
        this.favorites = favorites;
        this.getFavorites();
      }
    });
   
  }

  addFavorite(id: number): boolean {
    if (!this.isFavorite(id))
      this.favorites.push(id);
      this.storage.set('favorites',this.favorites);
    console.log('favorites', this.favorites);
    return true;
  }

  isFavorite(id: number): boolean {
    return this.favorites.some(el => el === id);

  }

  getFavorites(): Observable<Dish[]> {
    return this.dishservice.getDishes().pipe(map(dishes => dishes.filter(dish => this.favorites.some(el => el === dish.id))));
  }

  deleteFavorite(id: number): Observable<Dish[]> {
    let index = this.favorites.indexOf(id);
    if (index >= 0) {
      this.favorites.splice(index,1);
      this.storage.set('favorites',this.favorites);
      return this.getFavorites();
    }else if(index == 0){
      this.favorites.splice(index,1);
      this.storage.remove('favorites');
      return this.getFavorites();
    }
    else {
      console.log('Deleting non-existant favorite', id);
      return Observable.throw('Deleting non-existant favorite' + id);
    }
  }
}
