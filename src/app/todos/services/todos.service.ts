import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

import { ITodo } from 'src/app/todos/types/todo.interface';

@Injectable()
export class TodosService {
  public todos$ = new BehaviorSubject<ITodo[]>([]);
}
