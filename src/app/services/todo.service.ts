import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Filter } from '../models/filtering.model';
import { Todo } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private todos: Todo[];
  private filterTodos: Todo[];
  private lengthSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private displayTodosSubject: BehaviorSubject<Todo[]> = new BehaviorSubject<Todo[]>([]);
  private currentFilter: Filter = Filter.All;

  todo$: Observable<Todo[]> = this.displayTodosSubject.asObservable();
  length$: Observable<number> = this.lengthSubject.asObservable();
  constructor(){}
  private UpdateTodosData(){
    this.displayTodosSubject.next(this.filterTodos);
    this.lengthSubject.next(this.todos.length);
  }

  public FilterTodo(filter: Filter){
    this.currentFilter = filter;
    switch (filter) {
      case Filter.Active:
        this.filterTodos = this.todos.filter(todo => !todo.isCompleted);
        break;
      case Filter.Completed:
        this.filterTodos = this.todos.filter(todo => todo.isCompleted);
        break;
      case Filter.All:
        this.filterTodos = this.todos;
        break;
    }
  }

  public AddTodo(content: string){
    const date = new Date(Date.now()).getTime();
    const newTodo = new Todo(date, content);
    this.todos.unshift(newTodo);
  }
}
