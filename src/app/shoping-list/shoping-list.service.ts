import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShopingListService {
  private ingredients:Ingredient[] =[
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ];

  // constructor() { }

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
  }

}