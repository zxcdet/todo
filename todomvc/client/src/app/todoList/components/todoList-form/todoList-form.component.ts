import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { TodoService } from '../../services/todo.service';
import { TodoInterface } from '../../types/todo.interface';
import { TodoRequestInterface } from '../../types/todoRequest.interface';
import { TodoTaskService } from '../../../todoTask/components/services/todoTask.service';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todoList-form.component.html',
  styleUrls: ['./todoList-form.component.css']
})
export class TodoListFormComponent implements OnInit {

  public form: FormGroup;
  public todoList: TodoInterface[];
  public isLoading = false;
  public totalLenght!: number;
  public page: number = 1;

  constructor(
    private formBuilde: FormBuilder,
    private todoService: TodoService,
    private todoTaskService: TodoTaskService
  ) {
  }

  public ngOnInit(): void {
    this.initializeForm();
    this.getTodoList();
  }

  public onSubmit(): void {
    this.todoService.create(this.form.value.name)
      .subscribe((todo) => {
          this.todoList.push(todo);
          this.todoService.getTodos().subscribe((todos) => {
            this.totalLenght = todos.length
          });
        }
      )
  };

  public delateTodo(id: TodoRequestInterface) {
    this.todoService.delate(id).subscribe(() => {
      const todo = this.todoList.find((todo) => todo._id === id);
      const inedex = this.todoList.indexOf(todo);
      delete this.todoList[inedex];
      this.todoService.getTodos().subscribe((todos) => {
        this.todoList = todos;
        this.totalLenght = todos.length
      });
    });
  };

  public updateTodo(updateItem: { id: TodoRequestInterface, newName: TodoRequestInterface }) {
    this.todoService.update(updateItem.id, updateItem.newName).subscribe((newTodo) => {
      const updatedToodo = this.todoList.find((todo) => todo._id === newTodo._id);
      updatedToodo.name = updateItem.newName
    })
  };

  private initializeForm(): void {
    this.form = this.formBuilde.group({
        name: [null, [Validators.required]]
      }
    );
  };

  private getTodoList() {
    this.isLoading = true;
    this.todoService.getTodos().subscribe((todos) => {
      this.todoList = todos;
      const todo = this.todoList.find((todo) => todo._id);
      this.isLoading = false;
      this.totalLenght = todos.length
    });
  };

}
