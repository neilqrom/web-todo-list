import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  urlCreate = environment.urlPost;
  urlGetTasks = environment.urlGet;
  urlUpdate = environment.urlPut;

  getTasks(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.get(`${this.urlGetTasks}`, httpOptions);
  }

  createTask(body){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post(`${this.urlCreate}`, body, httpOptions);
  }

  updateTask(body){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.put(`${this.urlUpdate}`, body, httpOptions);
  }

}
