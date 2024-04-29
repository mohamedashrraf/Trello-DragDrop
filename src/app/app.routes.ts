import { Routes } from '@angular/router';
import { TodoComponent } from './Components/todo/todo.component';

export const routes: Routes = [
  {path: '', redirectTo:'/todo', pathMatch:'full'},
  {path:"todo", component:TodoComponent, title: "Trello"}
];
