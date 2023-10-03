import { Component } from '@angular/core';
import { Task } from '../interfaces/task';
import { AlertInput, IonModal } from '@ionic/angular';
import { TaskService } from '../providers/task.service'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  isModalOpen = false;

  task!: Task;

  myTasks: Task[] = [];

  constructor(private taskService: TaskService) { }

  ionViewWillEnter() {
    this.taskService.getTask().then(data => {
      this.myTasks = data;
    })
  }

  detailTask() {
    this.isModalOpen = !this.isModalOpen;
  }

  deleteTask(id: any) {
    this.taskService.deleteTask(id).then(resp => {
      this.myTasks = resp;
    }
    );

  }

  public alertButtons = [{
    text: 'Cancelar', handler: () => {
      console.log('Alert canceled');

    },
  }, {
    text: 'Guardar', handler: (e: AlertInput[]) => {
      this.alertInputs.forEach(e=>{
       return e.value = '';
      });
      const newTask = { title: e[0], description: e[1] }
      this.taskService.saveTask(newTask).then(resp => {
        this.myTasks = resp;
      });

      
    },
  }];

  public alertInputs: AlertInput[] = [
    {
      placeholder: 'Titulo',
      id: 'title',
      value: ''
    },
    {
      placeholder: 'Descripcion',
      id: 'description',
      value: '',
      attributes: {
        maxlength: 140,
      },
    },
  ];
}
