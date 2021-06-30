import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  collapsed = true;
  @Output() futureSlected = new EventEmitter<string>()

  constructor() { }

  ngOnInit(): void {
  }

  onSelect(x: string) {
    this.futureSlected.emit(x);
  }

}
