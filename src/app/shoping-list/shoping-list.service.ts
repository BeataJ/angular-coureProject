import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShopingListService {
  ingredientsChanges = new EventEmitter<Ingredient[]>()
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
    this.ingredientsChanges.emit(this.ingredients.slice());
  }

}
