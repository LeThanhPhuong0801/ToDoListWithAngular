import { Component, OnInit } from '@angular/core';
import { Filter, FilterButton } from 'src/app/models/filtering.model';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styleUrls: ['./todo-footer.component.scss']
})
export class TodoFooterComponent implements OnInit {
  filterButtons: FilterButton[] = [
    {type: Filter.All, label:'All', isActive: true},
    {type: Filter.Active, label:'Active', isActive: false},
    {type: Filter.Completed, label:'Complete', isActive: false}
];
  
  length:number = 0;
  
  constructor() { }

  ngOnInit(): void {
  }

}
