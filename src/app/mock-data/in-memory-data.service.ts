import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Todo } from '../todo/model/todo';

@Injectable()
export class InMemoryDataService implements InMemoryDbService {

  constructor() { }

  createDb(): {} {
    const todos: Todo[] = [
      {id: 'f823b191-7799-438d-8d78-fcb1e468fc78', desc: '签到', completed: true},
      {id: 'c316a3bf-b053-71f9-18a3-0073c7ee3b76', desc: '开会', completed: false}
    ];
    return {todos};
  }
}
