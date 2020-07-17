import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  @ViewChild('closebutton',{static: false}) closebutton;

  taskId: any;
  statusId: any;
  personId: any;
  title: string;
  description: string;
  listTasks: any;
  flagAction: boolean = true;
  validatorTitle: boolean;
  validatorDescription: boolean;
  flagModal: boolean;
  listStatus = [
    {
      'id': 1,
      'description': 'nuevo'
    },
    {
      'id': 2,
      'description': 'activo'
    },
    {
      'id': 3,
      'description': 'bloqueado'
    },
    {
      'id': 4,
      'description': 'completado'
    }
  ];

  listResponsable = [
    {
      'id': 1,
      'name': 'Erika'
    },
    {
      'id': 2,
      'name': 'Dante'
    },
    {
      'id': 3,
      'name': 'Mario'
    }
  ];

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.flagAction = true;
    this.validatorTitle = false;
    this.validatorDescription = false;
    this.findAllTasks();
  }

  openModalCreateTask() {
    this.flagAction = true;
    this.description = '';
    this.title = '';
    this.statusId = undefined;
    this.personId = undefined;
  }

  findAllTasks() {
    let error;
    this.taskService.getTasks().subscribe(
      res => {
        this.listTasks = res;
        console.log(this.listTasks);
      },
      err => {
        console.log("error en la recepcion del servicio");
        error = err;
        console.log(error);
      });
  }

  clean(form: NgForm) {
    this.description = '';
    this.title = '';
    form.reset();
  }

  validator() {
    if (this.title == "" || this.description == "") {
      if (this.title == "") {
        this.validatorTitle = true;
      }
      if (this.description == "") {
        this.validatorDescription = true;
      }
      this.flagModal = false;
      return false;
    } else {
      this.closebutton.nativeElement.click();
      return true;
    }
  }

  saveTask(form: NgForm) {
    if (this.validator()) {
      let error;
      const body = {
        title: this.title,
        description: this.description,
        status: {
          id: this.statusId
        },
        person: {
          id: this.personId
        },
        active: true
      };
      console.log(body);
      this.taskService.createTask(body).subscribe(
        res => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: `Se guardo con éxito`,
            showConfirmButton: false,
            timer: 1500
          });
          console.log("Se guardo la tarea exitosamente");
          this.clean(form);
          this.findAllTasks();
        },
        err => {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: `Ocurrio un error`,
            showConfirmButton: false,
            timer: 1500
          });
          console.log("No pudo guardar la tarea")
          error = err;
          console.log(error);
        }
      );
    }
  }

  editTask(task: any) {
    this.taskId = task.id;
    this.title = task.title;
    this.description = task.description;
    if (task.status == null) {
      this.statusId = undefined;
    } else {
      this.statusId = task.status.id;
    }
    if (task.person == null) {
      this.personId = undefined;
    } else {
      this.personId = task.person.id;
    }
    this.flagAction = false;
  }

  updateTask(form: NgForm) {
    if (this.validator()) {
      let error;
      let response;
      const body = {
        id: this.taskId,
        title: this.title,
        description: this.description,
        status: {
          id: this.statusId
        },
        person: {
          id: this.personId
        },
        active: true
      };
      console.log(body);

      this.taskService.updateTask(body).subscribe(
        res => {
          response = res;
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: `Se modifico con éxito`,
            showConfirmButton: false,
            timer: 1500
          });
          this.clean(form);
          console.log("Se modificó la tarea exitosamente");
          this.findAllTasks();
        },
        err => {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: `Ocurrio un error`,
            showConfirmButton: false,
            timer: 1500
          });
          console.log("No pudo modificar la tarea")
          error = err;
          console.log(error);
        }
      );
    }
  }

  deleteLogicTask(task: any) {
    let error;
    let response;
    const body = {
      id: task.id,
      title: task.title,
      description: task.description,
      status: {
        id: task.status.id
      },
      person: {
        id: task.person.id
      },
      active: false
    };
    console.log(body);

    this.taskService.updateTask(body).subscribe(
      res => {
        response = res;
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: `Se eliminó con éxito`,
          showConfirmButton: false,
          timer: 1500
        });
        console.log("Se eliminó la tarea exitosamente");
        this.findAllTasks();
      },
      err => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: `Ocurrio un error`,
          showConfirmButton: false,
          timer: 1500
        });
        console.log("No pudo eliminar la tarea")
        error = err;
        console.log(error);
      }
    );
  }

}
