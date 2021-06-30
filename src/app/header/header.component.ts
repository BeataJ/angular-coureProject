import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  collapsed = true;
  @Output() featureSlected = new EventEmitter<string>()

  constructor() { }

  ngOnInit(): void {
  }

  onSelect(x: string) {
    this.featureSlected.emit(x);
  }

}
