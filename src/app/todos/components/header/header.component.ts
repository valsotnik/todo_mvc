import { Component } from '@angular/core';

import { TodosService } from 'src/app/todos/services/todos.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})

export class HeaderComponent {
  public text: string = '';

  constructor(private todosService: TodosService) {}

  public changeText(event: Event) {
    const target = event.target as HTMLInputElement;
    this.text = target.value;
  }

  public addTodo(): void {
    this.todosService.addTodo(this.text);
    this.text = '';
  }
}
