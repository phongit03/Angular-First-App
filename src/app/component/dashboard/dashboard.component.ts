import { Component, Input, OnInit } from '@angular/core';
import { Task } from 'src/app/model/task';
import { CrudService } from 'src/app/service/crud.service';
import {CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { async } from 'rxjs';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
[x: string]: any;
  
  taskObj : Task = new Task();
  taskArr : Task[] = [];
  finishedTasks : Task[] = [];
  addTaskValue : string = '';
    constructor(private crudService:CrudService) {

    }
  ngOnInit(): void {
    this.addTaskValue = '';
    this.taskArr = [];
    this.finishedTasks = [];
    this.taskObj = new Task;
    this.getAllTasks();
    this.getAllFinished();
  }

 
  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      this.taskObj = event.previousContainer.data.at(event.previousIndex) as Task;
      this.taskObj.isFinished = !this.taskObj.isFinished;
      if(this.taskObj.isFinished) {
        this.deleteTask(this.taskObj);
        alert(this.taskObj.task_name+ " moved to finished section!");
      }

      if(!this.taskObj.isFinished) {
        this.deleteFinished(this.taskObj);
        alert(this.taskObj.task_name+ " moved to unfinished section!");
      }

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
     
    }
  }

//  --Unfinished tasks  
  getAllTasks() {
    this.crudService.getAllTask().subscribe(res => {
      this.taskArr = res;
    }, err => {
        console.log(err as string)
        alert("Failed to fetch task due to " + err);
      }
    )
  } 

  addTask(dropTask?: Task) {
    
    this.taskObj.task_name = dropTask != null ? dropTask.task_name : this.addTaskValue;
    this.crudService.addTask(this.taskObj).subscribe(res => {
      this.ngOnInit();
      if(dropTask == null) {
        this.addTaskValue = '';
      }
      
    }, err => {
        console.log(err as string)
        alert("Failed to add " + this.taskObj.task_name + " due to duplicated id " + this.taskObj.id);
      }
    )
  } 


  deleteTask(dTask: Task) {
      this.crudService.deleteTask(dTask).subscribe(res => {
        this.ngOnInit();
        if(dTask.isFinished) {
          this.addFinished(dTask)
        }
      }, err => {
        console.log(err as string)
        alert("Failed to delete task due to " + err);
      }
    )
  }

  call(eTask:Task) {
    this.taskObj = eTask;
  }


//  --Finished tasks
  getAllFinished() {
    this.crudService.getAllFinished().subscribe(res => {
      this.finishedTasks = res;
    }, err => {
      console.log(err as string)
      alert("Failed to display finished tasks!");
    })
  }

  addFinished(task: Task) {
    task.id+=2;
    this.crudService.addFinished(task).subscribe(res => {
      this.ngOnInit();
    }, err => {
      console.log(err as string)
      alert("Failed to add finished!");
    })
  }

  deleteFinished(dTask: Task) {
    this.crudService.deleteFinished(dTask).subscribe(res => {
      this.ngOnInit();
      if(!dTask.isFinished) {
        this.addTask(dTask);
      }
    }, err => {
      console.log(err as string)
      alert("Failed to delete finished due to " + err);
    }
  )
}

 
}


