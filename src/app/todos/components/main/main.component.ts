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

  constructor(private todosService: TodosService) {}

  public ngOnInit(): void {
    this.visibleTodos$ = combineLatest(
      this.todosService.todos$,
      this.todosService.filter$
      ).pipe(
        map(([todos, filter]: [ITodo[], FilterEnum]) => {
          if (filter === FilterEnum.active) {
            return todos.filter((todo) => !todo.isCompleted);
          } else if (filter === FilterEnum.complited) {
            return todos.filter((todo) => todo.isCompleted);
          }
          return todos;
      })
      )
  }
}
