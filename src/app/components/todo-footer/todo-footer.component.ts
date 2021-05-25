import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { Filter, FilterButton } from 'src/app/models/filtering.model';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styleUrls: ['./todo-footer.component.scss']
})
export class TodoFooterComponent implements OnInit, OnDestroy{
  filterButtons: FilterButton[] = [
    {type: Filter.All, label:'All', isActive: true},
    {type: Filter.Active, label:'Active', isActive: false},
    {type: Filter.Completed, label:'Complete', isActive: false}
];
  
  length:number = 0;
  hasCompleted$: Observable<boolean>;
  destroy$: Subject<null> = new Subject<null>();

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.hasCompleted$ = this.todoService.todos$.pipe(map(todos => todos.some(t => t.isCompleted)), takeUntil(this.destroy$));
    this.todoService.length$.pipe(takeUntil(this.destroy$)).subscribe(length => {
      this.length = length;
    })
  }

  Filter(type: Filter) {
    this.SetActiveBtn(type);
    this.todoService.FilterTodo(type);
    this.todoService.UpdateTodosData();
  }

  private SetActiveBtn(type: Filter) {
    this.filterButtons.forEach(btn => {
      btn.isActive = btn.type === type;
    });
  }

  ClearCompleted() {
    this.todoService.ClearCompleted();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
