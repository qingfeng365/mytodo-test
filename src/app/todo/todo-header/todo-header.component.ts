import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-todo-header',
  templateUrl: './todo-header.component.html',
  styleUrls: ['./todo-header.component.css']
})
export class TodoHeaderComponent implements OnInit {

  @Input()
  hint = '';

  @Output()
  onInputCompleted = new EventEmitter<string>();

  inputText: string;

  constructor() { }

  ngOnInit() {
  }

  inputCompleted() {
    if (this.inputText !== '') {
      this.onInputCompleted.emit(this.inputText);
      this.inputText = '';
    }
  }

}
