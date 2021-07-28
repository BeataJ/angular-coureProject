import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe

  constructor(
    private recipieService: RecipeService,
    private 
    ) { }

  ngOnInit(): void {
  }

  onAddToShopingList() {
    this.recipieService.addIngredientsToShopingList(this.recipe.ingredients);
  }

}
