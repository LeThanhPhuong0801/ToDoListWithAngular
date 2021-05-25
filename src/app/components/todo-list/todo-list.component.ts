import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from 'src/app/models/todo.model';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  todos$: Observable<Todo[]>;

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.todos$ = this.todoService.todos$;
  }
  OnChangeTodoStatus(todo: Todo) {
    this.todoService.ChangeTodoStatus(todo.id, todo.isCompleted);
  }

  OnEditTodo(todo: Todo)
  {
    this.todoService.EditTodo(todo.id, todo.content);
  }

  OnDeleteTodo(todo: Todo) {
    this.todoService.DeleteTodo(todo.id);
  }
}
