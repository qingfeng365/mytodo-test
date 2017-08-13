import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoComponent } from './todo.component';
import { TodoService } from './service/todo.service';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { TodoFooterComponent } from './todo-footer/todo-footer.component';
import { TodoHeaderComponent } from './todo-header/todo-header.component';
import { TodoRoutingModule } from './todo-routing.module';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoItemComponent } from './todo-item/todo-item.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    TodoRoutingModule
  ],
  declarations: [TodoComponent, TodoFooterComponent, TodoHeaderComponent, TodoListComponent, TodoItemComponent],
  providers: [TodoService]
})
export class TodoModule { }
