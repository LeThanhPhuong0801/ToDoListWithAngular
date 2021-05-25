import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Todo } from 'src/app/models/todo.model';

const fateAnimations = trigger('completeAnimations', [
  state('active', style({
    fontSize: '18px',
    color: 'black'
  })),
  state('completed', style({
    fontSize: '18px',
    color: 'grey',
    textDecoration: 'line-through'
  })),
  transition('active <=> completed', [animate(250)]),
]);

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
  animations: [fateAnimations]
})
export class TodoItemComponent implements OnInit {

  @Input() todo: Todo;
  @Output() changeStatus: EventEmitter<Todo> = new EventEmitter<Todo>();
  @Output() editStatus: EventEmitter<Todo> = new EventEmitter<Todo>();
  @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter<Todo>();

  isHovered = false;
  isEditing = false;
  
  constructor() { }

  ngOnInit(): void {
  }

  ChangeTodoStatus(){
    this.changeStatus.emit({...this.todo, isCompleted: !this.todo.isCompleted});
  }

  SubmitEditing(event: KeyboardEvent){
    const {keyCode} = event;
    event.preventDefault();
    if (keyCode === 13){
      this.editStatus.emit(this.todo);
      this.isEditing = false;
    }
  }

  RemoveTodo() {
    this.deleteTodo.emit(this.todo);
  }
}
