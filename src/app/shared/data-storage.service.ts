import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { RecipeService } from "../recipes/recipe.service";
import { environment } from "../../../src/environment-app"

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
        this.http.get(environment.apiUrl)
            .subscribe(recipe => {
                console.log(recipe);
            });
    }
}