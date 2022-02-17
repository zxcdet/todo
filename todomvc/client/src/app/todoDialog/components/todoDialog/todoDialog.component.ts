import { Component, EventEmitter, Output } from '@angular/core';import { TodoDialogPageComponent } from '../todoDialog-page/todoDialog-page.component';import { MatDialog } from '@angular/material/dialog';import { TodoTaskRequestInterface } from '../../../todoTask/types/todoTaskRequest.interface';@Component({  selector: 'todo-dialog',  templateUrl: './todoDialog.component.html',  styleUrls: ['./todoDialog.component.css']})export class TodoDialogComponent {  public name: TodoTaskRequestInterface;  @Output() emitText: EventEmitter<TodoTaskRequestInterface> = new EventEmitter<TodoTaskRequestInterface>();  constructor(public dialog: MatDialog) {  }  openDialog(): void {    const dialogRef = this.dialog.open(TodoDialogPageComponent, {      width: '400px',      data: {name: this.name}    });    dialogRef.afterClosed().subscribe(result => {      this.name = result;      this.emitText.emit(result);    });  }}