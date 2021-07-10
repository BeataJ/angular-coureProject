import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe('A Test Recipe 1', 'This is simply a test', 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fkeeprecipes.com%2Fsites%2Fkeeprecipes%2Ffiles%2Facar.jpg&f=1&nofb=1'),
    new Recipe('A Test Recipe 2', 'This is simply a test', 'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.hy-vee.com%2Fwebres%2FImage%2FRecipes%2FVEGGIE-CHEESE-WRAPS.jpg&f=1&nofb=1')
  ];

  getRecipes() {
    return this.recipes.slice();
  }


  // constructor() { }
}
