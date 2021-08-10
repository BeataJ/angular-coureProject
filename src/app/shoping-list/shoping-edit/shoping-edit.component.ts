import { Component, ElementRef,  OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShopingListService } from '../shoping-list.service';


@Component({
  selector: 'app-shoping-edit',
  templateUrl: './shoping-edit.component.html',
  styleUrls: ['./shoping-edit.component.css']
})
export class ShopingEditComponent implements OnInit {
  
  

  constructor(private slService: ShopingListService) { }

  ngOnInit(): void {
  }

  onAddItem(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name,value.amount);
    this.slService.addIngredient(newIngredient);
  }

}
