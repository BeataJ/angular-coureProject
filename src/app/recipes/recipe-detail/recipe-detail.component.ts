import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  @Input() recipe: Recipe

  constructor(private recipieService: RecipeService) { }

  ngOnInit(): void {
  }

  onAddToShopingList() {
    this.recipieService.addIngredientsToShopingList(this.recipe.ingredients);
  }

}
