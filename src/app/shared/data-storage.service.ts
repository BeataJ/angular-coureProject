import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { RecipeService } from "../recipes/recipe.service";
import { environment } from "../../../src/environment-app"
import { Recipe } from "../recipes/recipe.model";
import {  map } from "rxjs/operators";
import { Ingredient } from "./ingredient.model";

@Injectable({
    providedIn: 'root'
})
export class DataStorageService {
    constructor(
        private http: HttpClient,
        private recipeService: RecipeService
        ) {}

    storeRecipes() {
       const recipes = this.recipeService.getRecipes(); 
       this.http.put(environment.apiUrl, recipes)
        .subscribe(res => {
            console.log(res)
        }) 
    }

    fetchRecipes(){
        this.http.get<Recipe[]>(environment.apiUrl)
            .pipe(map(recipes => {
                return recipes.map(recipe => {
                    return {
                        ...recipe, 
                        ingredients: recipe.ingredients ? recipe.ingredients :[]}
                })
            }))
            .subscribe(recipes => {
                this.recipeService.setRecipes(recipes)
            });
    }
}