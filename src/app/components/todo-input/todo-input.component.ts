import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-input',
  templateUrl: './todo-input.component.html',
  styleUrls: ['./todo-input.component.scss']
})
export class TodoInputComponent implements OnInit {

  todoContent: string;

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
  }

  OnSubmit() {

    if (this.todoContent === '') {
      return false;
    }

    console.log(this.todoContent);
    this.todoService.AddTodo(this.todoContent);
    this.todoContent = '';

    return true;
  }

}
