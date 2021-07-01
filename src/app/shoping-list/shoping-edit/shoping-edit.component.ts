import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';


@Component({
  selector: 'app-shoping-edit',
  templateUrl: './shoping-edit.component.html',
  styleUrls: ['./shoping-edit.component.css']
})
export class ShopingEditComponent implements OnInit {
  @ViewChild('nameInput', {static: false }) nameInputRef: ElementRef;
  @ViewChild('amountInput', {static: false }) amountInputRef: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  onAddItem() {}

}
