import { Injectable } from '@angular/core';
import { Task } from '../interfaces/task'
import { Storage } from '@ionic/storage'


@Injectable({
    providedIn: 'root'
})
export class TaskService {

    tasks: Task[] = [];

    constructor(private storage: Storage) {
        this.getTask().then(data => {
            this.tasks = data == null ? [] : data;
        })
    }


    public getTask(): Promise<Task[]> {
        return this.storage.get('tasks');
    }

    public saveTask(t: any): Promise<Task[]> {
        if (t.id == undefined) {
            const newTask = { id: Date.now(), title: t.title, description: t.description, isDone: false }
            this.tasks.push(newTask);
        }

        return this.storage.set('tasks', this.tasks);
    }

    public deleteTask(id: number): Promise<Task[]> {
        this.tasks = this.tasks.filter(t => t.id != id);
        return this.storage.set('tasks', this.tasks);
    }

}