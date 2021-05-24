import { MapType } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { from, Observable } from 'rxjs';
import { TodoService } from './services/todo.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  hasTodo$: Observable<boolean>; 

  constructor(private todoService: TodoService){}

  ngOnInit()
  {
    this.hasTodo$ = this.todoService.length$.pipe(map(length => length > 0))
  }
}
