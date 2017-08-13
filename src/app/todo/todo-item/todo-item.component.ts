import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {

  @Input()
  isChecked: boolean;

  @Input()
  desc: string;

  @Output()
  onRequireSwitch = new EventEmitter<void>();
  @Output()
  onRequireRemove = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }
  switch() {
    this.onRequireSwitch.emit();
  }
  remove() {
    this.onRequireRemove.emit();
  }
}
