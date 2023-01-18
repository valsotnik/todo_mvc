import { Component, OnInit } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { TodosService } from 'src/app/todos/services/todos.service';
import { ITodo } from 'src/app/todos/types/todo.interface';
import { FilterEnum } from 'src/app/todos/types/filter.enum';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html'
})

export class MainComponent implements OnInit {
  public visibleTodos$: Observable<ITodo[]>;
  public noTodoClass$: Observable<boolean>;
  public isAllTodosSelected$: Observable<boolean>;

  constructor(private todosService: TodosService) {}

  public ngOnInit(): void {
    // checking isComplited status of all todos
    this.isAllTodosSelected$ = this.todosService.todos$.pipe(
      map((todos) => todos.every(todo => todo.isCompleted))
    );

    //ckecking if no todos in stream - add hidden class to container
    this.noTodoClass$ = this.todosService.todos$.pipe(
      map((todos) => todos.length === 0)
    );

    // combine todos and filter streams and filtering by state
    this.visibleTodos$ = combineLatest(
      this.todosService.todos$,
      this.todosService.filter$
      ).pipe(
        map(([todos, filter]: [ITodo[], FilterEnum]) => {
          return  (filter === FilterEnum.active) ? todos.filter((todo) => !todo.isCompleted) :
                  (filter === FilterEnum.complited) ? todos.filter((todo) => todo.isCompleted) : todos;
      })
      )
  }

  //toggle all todos in isComplited=true by clicking on shevron button
  public toggleAllTodos(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.todosService.toggleAll(target.checked);
  }
}
