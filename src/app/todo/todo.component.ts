import { Component, OnInit } from '@angular/core';
import { Todo } from './model/todo';
import { TodoService, TodoFilterType } from './service/todo.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import 'rxjs/Rx';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  todos: Todo[];
  currFilterType: string;
  constructor(private todoService: TodoService,
    private routeInfo: ActivatedRoute) { }

  ngOnInit() {
    this.routeInfo.params.subscribe(params => {
      const filterTypeName = params['filterType'];
      this.currFilterType = filterTypeName || 'all';
      if (!filterTypeName) {
        this.getTodos(TodoFilterType.all);
      } else {
        const keyname = filterTypeName as keyof typeof TodoFilterType;
        this.getTodos(TodoFilterType[keyname]);
      }
    });

  }


  getTodos(filterType: TodoFilterType): void {

    this.todoService
      .filterTodos(filterType)
      .then(todos => {
        console.log('getTodos 完成...');
        this.todos = [...todos];
        console.log(this.todos);
      });
  }

  addTodo(desc: string) {
    this.todoService
      .addTodo(desc)
      .then(todo => {
        this.todos = [...this.todos, todo];
      });
  }

  toggleTodo(todo: Todo) {
    const i = this.todos.indexOf(todo);
    this.todoService
      .toggleTodo(todo)
      .then(t => {
        this.todos = [
          ...this.todos.slice(0, i),
          t,
          ...this.todos.slice(i + 1)
        ];
      });
  }

  removeTodo(todo: Todo) {
    const i = this.todos.indexOf(todo);
    this.todoService
      .deleteTodoById(todo.id)
      .then(() => {
        this.todos = [
          ...this.todos.slice(0, i),
          ...this.todos.slice(i + 1)
        ];
      });
  }

  clearCompleted() {
    const completedTodos = this.todos.filter(todo => todo.completed === true);
    Observable.from(completedTodos)
      .concatMap(todo => this.todoService.deleteTodoById(todo.id))
      .count()
      .subscribe(() => {
        console.log('准备读取Todos...');
        this.getTodos(TodoFilterType.all);
      });

    // Observable.from(completedTodos)
    //   .flatMap(todo => this.todoService.deleteTodoById(todo.id))
    //   .count()
    //   .subscribe(() => {
    //     console.log('准备读取Todos...');
    //     this.getTodos(TodoFilterType.all);
    //   });


  }

  toggleAll(isSelectAll: boolean) {
    const todos = this.todos.filter(todo => todo.completed === !isSelectAll);
    Observable.from(todos)
      .flatMap(todo => this.todoService.toggleTodo(todo))
      .count()
      .subscribe(() => {
        this.getTodos(TodoFilterType.all);
      });
  }
}
