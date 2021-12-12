import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, tap } from "rxjs/operators";
import { Store } from "@ngrx/store";

import { RecipeService } from "../recipes/recipe.service";
import { environment } from "../../../src/environment-app"
import { Recipe } from "../recipes/recipe.model";
import * as fromApp from '../store/app.reducer';
import * as RecipesActions from '../recipes/store/recipe.action';


@Injectable({
    providedIn: 'root'
})
export class DataStorageService {
    constructor(
        private http: HttpClient,
        private recipeService: RecipeService,
        private store: Store<fromApp.AppState>
        ) {}

    storeRecipes() {
       const recipes = this.recipeService.getRecipes(); 
       this.http.put(environment.apiUrl, recipes)
        .subscribe(res => {
            console.log(res)
        }) 
    }

    fetchRecipes(){
     
           return this.http.get<Recipe[]>(environment.apiUrl,
           
       ).pipe(
           map(recipes => {
               return recipes.map(recipe => {
                   return {
                       ...recipe,
                       ingredients: recipe.ingredients ? recipe.ingredients : []
                   }
               })
           }),
           tap(recipes => {
            this.store.dispatch(new RecipesActions.SetRecipes(recipes))
           })
           
       )         
    }
}