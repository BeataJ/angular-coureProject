import { NgModule } from "@angular/core";
import { Router } from "@angular/router";

import { RecipeService } from "./recipes/recipe.service";
import { ShopingListService } from "./shoping-list/shoping-list.service";

const appRouters: Router = [
    { path: '', redirectTo: '/recipes' },
    { path: 'recipes', component: RecipeService},
    { path: 'shoping-list', component: ShopingListService }
]

@NgModule({

})
export class AppRoutingModule {

}