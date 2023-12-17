import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../model/task';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  serviceUrL : string ;

  finishedUrl: string;


  constructor(private http : HttpClient) {
    this.serviceUrL = "http://localhost:3000/tasks";
    this.finishedUrl = "http://localhost:3000/finishedTasks";
  }

// --Unfinished tasks services
  addTask(task : Task) : Observable<Task> {
    return this.http.post<Task>(this.serviceUrL,task);
  }

  getAllTask() : Observable<Task[]> {
    return this.http.get<Task[]>(this.serviceUrL);
  }

  deleteTask(task : Task) : Observable<Task> {
    return this.http.delete<Task>(this.serviceUrL+'/' + task.id)
  }

  editTask(task : Task) : Observable<Task> {
    return this.http.put<Task>(this.serviceUrL+'/'+task.id,task);
  }

// --Finished tasks services
  getAllFinished() : Observable<Task[]> {
    return this.http.get<Task[]>(this.finishedUrl);
  }

  addFinished(task : Task) : Observable<Task> {
    return this.http.post<Task>(this.finishedUrl,task);
  }

  deleteFinished(task : Task) : Observable<Task> {
    return this.http.delete<Task>(this.finishedUrl+'/' + task.id)
  }

}
