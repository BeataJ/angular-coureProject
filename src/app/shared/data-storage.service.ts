import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { RecipeService } from "../recipes/recipe.service";
import { environment } from "../../../src/environment-app"
import { Recipe } from "../recipes/recipe.model";
import {  map, tap } from "rxjs/operators";
import { Ingredient } from "./ingredient.model";
import { AuthService } from "../auth/auth.service";

@Injectable({
    providedIn: 'root'
})
export class DataStorageService {
    constructor(
        private http: HttpClient,
        private recipeService: RecipeService,
        private authService: AuthService
        ) {}

    storeRecipes() {
       const recipes = this.recipeService.getRecipes(); 
       this.http.put(environment.apiUrl, recipes)
        .subscribe(res => {
            console.log(res)
        }) 
    }

    fetchRecipes(){
       return this.http.get<Recipe[]>(environment.apiUrl)
            .pipe(
                map(recipes => {
                    return recipes.map(recipe => {
                        return {
                        ...recipe, 
                        ingredients: recipe.ingredients ? recipe.ingredients :[]}
                    })
                }),
                tap(recipes => {
                    this.recipeService.setRecipes(recipes)
                })
            )
            
    }
}