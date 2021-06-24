import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('A Test Recipe', 'This is simply a test', 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fkeeprecipes.com%2Fsites%2Fkeeprecipes%2Ffiles%2Facar.jpg&f=1&nofb=1'),
    new Recipe('A Test Recipe', 'This is simply a test', 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fkeeprecipes.com%2Fsites%2Fkeeprecipes%2Ffiles%2Facar.jpg&f=1&nofb=1')
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
