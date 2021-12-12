import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(
    private recipieService: RecipeService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>
    ) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          // this.recipe = this.recipieService.getRecipe(this.id)
          this.store.select('recipes')
            .pipe(
              map(recipeState => {
                return recipeState.recipes.find((recipe,index)=> {
                  return index === this.id
                })
              })
            ).subscribe(recipe => {
              this.recipe = recipe;
            })
        }
      )
  }

  onAddToShopingList() {
    this.recipieService.addIngredientsToShopingList(this.recipe.ingredients);
  }

  onEditRecipe(){
    this.router.navigate(['edit'], { relativeTo: this.route})
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route})
  }

  onDeleteRecipe() {
    this.recipieService.deleteRecipe(this.id);
    this.router.navigate(['/recipes'])
  }

}
