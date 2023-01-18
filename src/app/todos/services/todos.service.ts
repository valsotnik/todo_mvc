import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

import { FilterEnum } from 'src/app/todos/types/filter.enum';
import { ITodo } from 'src/app/todos/types/todo.interface';

@Injectable()
export class TodosService {
  public todos$ = new BehaviorSubject<ITodo[]>([]);
  public filter$ = new BehaviorSubject<FilterEnum>(FilterEnum.all);

  public addTodo(text: string): void {
    const newTodo: ITodo = {
      id: Math.random().toString(16),
      text,
      isCompleted: false,
    };

    const updatesTodos = [...this.todos$.getValue(), newTodo]
    this.todos$.next(updatesTodos)
  }

  public toggleAll(isCompleted: boolean): void {
    const updatedTodos = this.todos$.getValue().map((todo) => {
      return {
        ...todo,
        isCompleted
      }
    });
    this.todos$.next(updatedTodos);
  }
}
