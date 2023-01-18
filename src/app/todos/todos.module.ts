import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { TodosService } from 'src/app/todos/services/todos.service';
import { HeaderComponent } from 'src/app/todos/components/header/header.component';
import { TodosComponent } from 'src/app/todos/components/todos/todos.component';

const routes: Routes = [
  { path: '', component: TodosComponent}
]

@NgModule({
  declarations: [TodosComponent, HeaderComponent],
  imports: [RouterModule.forChild(routes)],
  providers: [TodosService]
})
export class TodosModule {}
