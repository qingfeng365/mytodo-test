import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styleUrls: ['./todo-footer.component.css']
})
export class TodoFooterComponent implements OnInit {

  @Input()
  itemCount: number;

  @Output()
  onRequireClear = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

  clear() {
    this.onRequireClear.emit();
  }
}
