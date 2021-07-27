import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { RecipeService } from "./recipes/recipe.service";
import { ShopingListService } from "./shoping-list/shoping-list.service";

const appRoutes: Routes = [
    { path: '', redirectTo: '/recipes', pathMatch: 'full' },
    { path: 'recipes', component: RecipeService},
    { path: 'shoping-list', component: ShopingListService },
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}