import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { TodosService } from 'src/app/todos/services/todos.service';
import { MainComponent } from 'src/app/todos/components/main/main.component';
import { HeaderComponent } from 'src/app/todos/components/header/header.component';
import { TodosComponent } from 'src/app/todos/components/todos/todos.component';
import { TodoComponent } from 'src/app/todos/components/todo/todo.component';
import { FooterComponent } from 'src/app/todos/components/footer/footer.component';

const routes: Routes = [
  { path: '', component: TodosComponent}
]

@NgModule({
  declarations: [
    TodosComponent,
    TodoComponent,
    HeaderComponent,
    MainComponent,
    FooterComponent
  ],
  imports: [CommonModule, RouterModule.forChild(routes)],
  providers: [TodosService]
})
export class TodosModule {}
