import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/model/task';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
[x: string]: any;
  
  taskObj : Task = new Task();
  taskArr : Task[] = [];
  addTaskValue : string = '';
  editTaskValue : string = '';
    constructor(private crudService:CrudService) {

    }
  ngOnInit(): void {
    this.addTaskValue = '';
    this.editTaskValue = '';
    this.taskArr = [];
    this.taskObj = new Task;
    this.getAllTasks();
  }

  getAllTasks() {
    this.crudService.getAllTask().subscribe(res => {
      this.taskArr = res;
    }, err => {
        alert("Failed to fetch task due to " + err);
      }
    )
  } 

  addTask() {
    this.taskObj.task_name = this.addTaskValue;
  
    this.crudService.addTask(this.taskObj).subscribe(res => {
      this.ngOnInit();
      this.addTaskValue = '';
    }, err => {
        console.log(err as string)
        alert("Failed to add task due to " + err);
      }
    )
  } 

  editTask() {
    window.location.reload();
    this.taskObj.task_name = this.editTaskValue;
    this.crudService.editTask(this.taskObj).subscribe(res => {
        this.ngOnInit;
      }, err => {
        alert("Failed to edit due to " + err);
      }
    )
  }

  deleteTask(dTask: Task) {
    window.location.reload();
      this.crudService.deleteTask(dTask).subscribe(res => {
        this.ngOnInit;
      }, err => {
        alert("Failed to delete task due to " + err);
      }
    )
  }

  call(eTask:Task) {
    this.taskObj = eTask;
    this.editTaskValue = eTask.task_name;
  }
}
