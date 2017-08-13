import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Todo } from '../model/todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  @Input()
  todos: Todo[];
  @Output()
  onRequireSwitch = new EventEmitter<Todo>();
  @Output()
  onRequireRemove = new EventEmitter<Todo>();
  @Output()
  onRequireToggleAll = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit() {
  }
  switchItem(todo: Todo) {
    this.onRequireSwitch.emit(todo);
  }
  removeItem(todo: Todo) {
    this.onRequireRemove.emit(todo);
  }
  toggleAll(isSelected: boolean) {
    this.onRequireToggleAll.emit(isSelected);
  }
}
