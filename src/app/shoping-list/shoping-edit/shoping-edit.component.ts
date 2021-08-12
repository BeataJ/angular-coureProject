import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShopingListService } from '../shoping-list.service';


@Component({
  selector: 'app-shoping-edit',
  templateUrl: './shoping-edit.component.html',
  styleUrls: ['./shoping-edit.component.css']
})
export class ShopingEditComponent implements OnInit, OnDestroy {
  subscription: Subscription
  editMode = false;
  editedNumberIndex: number;

  constructor(private slService: ShopingListService) { }

  ngOnInit(): void {
    this.subscription = this.slService.startedEditing
      .subscribe(
        (index: number) => {
          this.editedNumberIndex = index;
          this.editMode = true;
        }
      );
  }

  onAddItem(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name,value.amount);
    this.slService.addIngredient(newIngredient);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
