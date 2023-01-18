import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})

export class HeaderComponent {
  public text: string = '';

  public changeText(event: Event) {
    const target = event.target as HTMLInputElement;
    this.text = target.value;
  }

  public addTodo(): void {
    console.log('AddTodo', this.text);

  }
}
