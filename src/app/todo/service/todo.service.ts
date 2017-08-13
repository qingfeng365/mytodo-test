import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Todo } from '../model/todo';
import 'rxjs/add/operator/toPromise';
import * as UUID from 'node-uuid';

@Injectable()
export class TodoService {

  private apiUrl = 'api/todos';

  constructor(private http: Http) { }

  catchError(err) {
    console.log(err);
    return Promise.reject(err.message || err);
  }

  getTodos(): Promise<Todo[]> {
    return this.filterTodos(TodoFilterType.all);
  }

  toggleTodo(todo: Todo): Promise<Todo> {
    const url = `${this.apiUrl}/${todo.id}`;
    const updatedTodo = Object.assign({}, todo, { completed: !todo.completed });
    return this.http.put(url, updatedTodo)
      .toPromise()
      .then(() => updatedTodo)
      .catch(this.catchError);
  }

  addTodo(desc: string): Promise<Todo> {
    const body = {
      id: UUID.v4(),
      desc: desc,
      completed: false
    };
    return this.http.post(this.apiUrl, body)
      .toPromise()
      .then(res => res.json().data as Todo)
      .catch(this.catchError);
  }

  deleteTodoById(id: string): Promise<string>  {
    const url = `${this.apiUrl}/${id}`;
    console.log('deleteTodoById 准备删除:' + id);
    return this.http
      .delete(url)
      .toPromise()
      .then(() => {
        console.log('deleteTodoById 删除成功:' + id);
        return id;
      })
      .catch(this.catchError);
  }
  filterTodos(filterType: TodoFilterType): Promise<Todo[]> {
    switch (filterType) {
      case TodoFilterType.all:
        return this.http.get(this.apiUrl)
          .toPromise()
          .then(res => res.json().data as Todo[])
          .catch(this.catchError);
      case TodoFilterType.active:
        return this.http
          .get(`${this.apiUrl}?completed=false`)
          .toPromise()
          .then(res => res.json().data as Todo[])
          .catch(this.catchError);
      case TodoFilterType.completed:
        return this.http
          .get(`${this.apiUrl}?completed=true`)
          .toPromise()
          .then(res => res.json().data as Todo[])
          .catch(this.catchError);
    }
  }

}

export enum TodoFilterType {
  all,
  active,
  completed
}
