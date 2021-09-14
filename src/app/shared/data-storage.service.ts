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
       return this.http.put(environment.apiUrl, recipes) 
    }
}