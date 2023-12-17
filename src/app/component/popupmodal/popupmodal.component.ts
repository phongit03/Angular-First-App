import { Component, Input, OnInit, Output } from '@angular/core';
import { Task } from 'src/app/model/task';
import { CrudService } from 'src/app/service/crud.service';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-popupmodal',
  templateUrl: './popupmodal.component.html',
  styleUrls: ['./popupmodal.component.css']
})
export class PopupmodalComponent implements OnInit{
  @Input() taskObj : Task = new Task();
  
  @Input() editTaskValue : string = '';


  constructor(private crudService:CrudService) {

  }

  ngOnInit(): void {
    this.taskObj = new Task;
    this.editTaskValue = '';
  }

  editTask() {
    this.taskObj.task_name = this.editTaskValue;
    this.crudService.editTask(this.taskObj).subscribe(res => {
        this.ngOnInit();
        window.location.reload();
      }, err => {
        alert("Failed to edit "+this.taskObj.task_name);
      }
    )
  }

 

}
