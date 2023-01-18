import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
  ViewChild,
  ElementRef,
  OnChanges,
  SimpleChanges } from '@angular/core';

import { TodosService } from 'src/app/todos/services/todos.service';
import { ITodo } from 'src/app/todos/types/todo.interface';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html'
})

export class TodoComponent implements OnInit, OnChanges {
  @Input('todo') todoProps: ITodo;
  @Input('isEditing') isEditingProps: boolean;
  @Output('setEditingId') setEditingIdEvent: EventEmitter<string | null> = new EventEmitter();
  public editingText: string = '';
  @ViewChild('textInput') textInput: ElementRef;

  constructor(private todosService: TodosService) {}

  public ngOnInit(): void {
    this.editingText = this.todoProps.text
  }

  public ngOnChanges(changes: SimpleChanges): void {
    // add focus on element in edit mode, setTimeout is needed because it's not rendered without it
    if (changes['isEditingProps'].currentValue) {
      setTimeout(() => {
        this.textInput.nativeElement.focus()
      }, 0);
    }
  }

  public setTodoInEditMode(): void {
    this.setEditingIdEvent.emit(this.todoProps.id)
  }

  public removeTodo(): void {
    this.todosService.removeTodo(this.todoProps.id);
  }

  public toggleTodo(): void {
    this.todosService.toggleTodo(this.todoProps.id);
  }

  public changeText(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.editingText = value;
  }

  public changeTodo(): void {
    this.todosService.changeTodo(this.todoProps.id, this.editingText);
    this.setEditingIdEvent.emit(null)
  }
}
