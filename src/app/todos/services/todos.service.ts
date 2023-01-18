import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

import { ITodo } from 'src/app/todos/types/todo.interface';

@Injectable()
export class TodosService {
  public todos$ = new BehaviorSubject<ITodo[]>([]);

  public addTodo(text: string): void {
    const newTodo: ITodo = {
      id: Math.random().toString(16),
      text,
      isCompleted: false,
    };

    const updatesTodos = [...this.todos$.getValue(), newTodo]
    this.todos$.next(updatesTodos)
  }
}
