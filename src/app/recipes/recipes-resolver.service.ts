import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";
import { Actions, ofType } from '@ngrx/effects';
import { take } from "rxjs/operators";

import { DataStorageService } from "../shared/data-storage.service";
import { RecipeService } from "./recipe.service";
import * as fromApp from '../store/app.reducer';
import * as RecipesActions from '../recipes/store/recipe.action';
import { Recipe } from "./recipe.model";



@Injectable({providedIn: 'root'})
export class RecipesResolverService implements Resolve<Recipe[]>{
    constructor(
        // private dataStorageService: DataStorageService,
        // private recipesService: RecipeService
        private store: Store<fromApp.AppState>,
        private actions$: Actions
        ) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        // const recipes = this.recipesService.getRecipes();

            this.store.dispatch(new RecipesActions.FetchRecipes())
            return this.actions$.pipe(
                ofType(RecipesActions.SET_RECIPES),
                take(1)
            )
    }
}