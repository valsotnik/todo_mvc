import { Component, Input } from '@angular/core';

import { ITodo } from 'src/app/todos/types/todo.interface';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html'
})

export class TodoComponent {
  @Input('todo') todoProps: ITodo
}
