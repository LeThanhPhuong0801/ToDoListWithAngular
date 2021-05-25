import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Filter } from '../models/filtering.model';
import { Todo } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private static readonly todoStorageKey = "todos";

  private todos: Todo[];
  private filterTodos: Todo[];
  private lengthSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private displayTodosSubject: BehaviorSubject<Todo[]> = new BehaviorSubject<Todo[]>([]);
  private currentFilter: Filter = Filter.All;

  todos$: Observable<Todo[]> = this.displayTodosSubject.asObservable();
  length$: Observable<number> = this.lengthSubject.asObservable();
  constructor(){
    this.todos =[];
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
        this.filterTodos = [...this.todos.map(todo => ({...todo}))];
        break;
    }
  }

  public AddTodo(content: string){
    const date = new Date(Date.now()).getTime();
    const newTodo = new Todo(date, content);
    this.todos.unshift(newTodo);
    this.UpdateTodosData();
  }

  ChangeTodoStatus(id: number, isCompleted: boolean) {
    const index = this.todos.findIndex(t => t.id === id);
    const todo = this.todos[index];
    todo.isCompleted = isCompleted;
    this.todos.splice(index, 1, todo);
    this.UpdateTodosData();
  }

  EditTodo(id: number, content: string){
    const index = this.todos.findIndex(t => t.id === id);
    const todo = this.todos[index];
    todo.content = content;
    this.todos.splice(index, 1, todo);
    this.UpdateTodosData();
  }

  DeleteTodo(id:number) {
    const index = this.todos.findIndex(t => t.id === id);
    this.todos.splice(index, 1);
    this.UpdateTodosData();
  }

  ToggleAll() {
    this.todos = this.todos.map(todo => {
      return{
        ...todo,
        isCompleted: !this.todos.every(t => t.isCompleted)
      };
    });
    this.UpdateTodosData();
  }

  ClearCompleted(){
    this.todos = this.todos.filter(todo => !todo.isCompleted);
    this.UpdateTodosData();
  }

  public UpdateTodosData(){
    this.FilterTodo(this.currentFilter);
    this.displayTodosSubject.next(this.filterTodos);
    this.lengthSubject.next(this.todos.length);
  }

}
