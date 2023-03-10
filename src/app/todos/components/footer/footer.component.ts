import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { FilterEnum } from 'src/app/todos/types/filter.enum';
import { TodosService } from 'src/app/todos/services/todos.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})

export class FooterComponent implements OnInit {
  public filter$: Observable<FilterEnum>;
  public noTodoClass$: Observable<boolean>;
  public activeCount$: Observable<number>;
  public itemsLeftText$: Observable<string>;
  public filterEnum = FilterEnum;

  constructor(private todosService: TodosService) {}

  public ngOnInit(): void {
    // ckecking if no todos in stream - add hidden class to container
    this.noTodoClass$ = this.todosService.todos$.pipe(
      map((todos) => todos.length === 0)
    );

    // changing value in counter of todos in the left side offooter
    this.activeCount$ = this.todosService.todos$.pipe(
      map((todos) => todos.filter((todo) => !todo.isCompleted).length)
    );

    // change item to items in plural form if todos > 1
    this.itemsLeftText$ = this.activeCount$.pipe(
      map((activeCount) => `item${activeCount !== 1 ? 's' : ''} left`)
    );
    this.filter$ = this.todosService.filter$
  }

  // change filter type by click
  public changeFilter(event: Event, filterName: FilterEnum): void {
    event.preventDefault();
    this.todosService.changeFilter(filterName);
  }
}
