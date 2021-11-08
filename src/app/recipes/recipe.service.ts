import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';
import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>()

  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'Chinese cucina',
  //     'Super sweet and tasty cucinia.',
  //     'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fkeeprecipes.com%2Fsites%2Fkeeprecipes%2Ffiles%2Facar.jpg&f=1&nofb=1',
  //     [
  //       new Ingredient('cucina', 2),
  //       new Ingredient('pepper', 1),
  //       new Ingredient('sweet sos', 1),
  //       new Ingredient('pinch of sesam',3)
  //     ]
  //     ),
  //   new Recipe(
  //     '"rollo" sandwich',
  //     'good for work or school',
  //     'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.hy-vee.com%2Fwebres%2FImage%2FRecipes%2FVEGGIE-CHEESE-WRAPS.jpg&f=1&nofb=1',
  //     [
  //       new Ingredient('roll', 1),
  //       new Ingredient('slice of cheese', 2),
  //       new Ingredient('slice of cucumber', 3),
  //       new Ingredient('pieces of onion', 6 ),
  //       new Ingredient('pieces of carrots', 12),
  //     ]
  //     )
  // ];

  private recipes: Recipe[] = [];

  constructor(
    private slService: ShoppingListService,
    private store: Store<{
      shoppingList: {
        ingredients: Ingredient[]
      }
    }>
  ){}
  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShopingList(ingredients: Ingredient[]) {
    // this.slService.addIngredients(ingredients);
    this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients))
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice())
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice())
   }

   deleteRecipe(index: number) {
     this.recipes.splice(index, 1);
     this.recipesChanged.next(this.recipes.slice());
   }
}
