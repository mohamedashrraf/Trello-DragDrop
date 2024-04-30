import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Task } from '../../Models/task';
import { MatButtonModule } from '@angular/material/button';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    CdkDropList,
    CdkDrag
  ],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss'
})
export class TodoComponent {
  todoForm!: FormGroup;
  tasks: Task[] = [];
  inprogress: Task[] = [];
  done: Task[] = [];
  isEditEnabled: boolean = false;
  updatedIndex!: any;

  constructor(private fb: FormBuilder) { }
  ngOnInit(): void {
    this.todoForm = this.fb.group({
      item: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  addTask() {
    this.tasks.push({
      Title: this.todoForm.value.item,
      Completed: false,
      Desctiption: ''
    });
    this.todoForm.reset();
  }


  onEditTask(task: Task, taskId: number) { //take item from list and put it in input
    this.isEditEnabled = true;
    this.updatedIndex = taskId;
    this.todoForm.controls['item'].setValue(task.Title);
  }
  updateTask() { //update item in input and appeat in list
    this.isEditEnabled = false;
    this.tasks[this.updatedIndex].Title = this.todoForm.value.item;
    this.tasks[this.updatedIndex].Completed = false;
    this.todoForm.reset();
    this.updatedIndex = -1;
  }

  deleteTask(taskId: number) {
    this.tasks.splice(taskId, 1);
  }
  deleteInprogressTask(taskId: number) {
    this.inprogress.splice(taskId, 1);
  }
  deleteDoneTask(taskId: number) {
    this.done.splice(taskId, 1);
  }


  drop(event: CdkDragDrop<Task[]>) {  //Mat function
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

}

// <div
//   cdkDropList
//   #todoList1="cdkDropList" ريفرنس امسك بيه الليست
//   [cdkDropListData]="tasks" الارااي اللي بتجيب منه الداتا
//   [cdkDropListConnectedTo]="[todoList2, todoList3]" اقدر اشد منها العنصر وارميه في ليست 2 او 3
//   class="example-list"
//   (cdkDropListDropped)="drop($event)"
// >
//   @for (item of tasks; track $index) {
//   <div class="example-box" cdkDrag>
//     {{ item.Title }}
//     <div class="box">
//       <button
//         mat-icon-button
//         color="warn"
//         (click)="deleteTask($index)"
//       >
//         <mat-icon>delete</mat-icon>
//       </button>
//       <button
//         mat-icon-button
//         color="primary"
//         (click)="onEditTask(item, $index)"
//       >
//         <mat-icon>edit</mat-icon>
//       </button>
//     </div>
//   </div>
//   }
// </div>
