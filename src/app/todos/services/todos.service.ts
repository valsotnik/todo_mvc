import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

import { FilterEnum } from 'src/app/todos/types/filter.enum';
import { ITodo } from 'src/app/todos/types/todo.interface';

@Injectable()
export class TodosService {
  public todos$ = new BehaviorSubject<ITodo[]>([]);
  public filter$ = new BehaviorSubject<FilterEnum>(FilterEnum.all);

  public addTodo(text: string): void {
    // add new todo with random id, input text and by default isCompleted in false
    const newTodo: ITodo = {
      id: Math.random().toString(16),
      text,
      isCompleted: false,
    };

    const updatesTodos = [...this.todos$.getValue(), newTodo]
    this.todos$.next(updatesTodos)
  }

  public toggleAll(isCompleted: boolean): void {
    // change in all todos state of isComplited by spread todo and add new value
    const updatedTodos = this.todos$.getValue().map((todo) => {
      return {
        ...todo,
        isCompleted
      }
    });

    this.todos$.next(updatedTodos);
  }

  public changeFilter(filterName: FilterEnum): void {
    this.filter$.next(filterName);
  }

  public changeTodo(id: string, text: string): void {
    // change in todo with passed id text by spread todo and add new text
    const updatedTodos = this.todos$.getValue().map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          text
        }
      }
      return todo
    });

    this.todos$.next(updatedTodos);
  }

  public removeTodo(id: string): void {
    // removing todo by filtering all todos with passed as argument id
    const updatedTodos = this.todos$.getValue().filter((todo) => todo.id !== id);

    this.todos$.next(updatedTodos);
  }

  public toggleTodo(id: string): void {
    // toggling a state of chosen todo by click on checkbox of this todo and marks it as completed
    const updatedTodos = this.todos$.getValue().map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          isCompleted: !todo.isCompleted
        }
      }
      return todo
    });

    this.todos$.next(updatedTodos);
  }
}
