import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  taskName: string = '';

  todoTasks: string[] = [];
  inProgressTasks: string[] = [];
  doneTasks: string[] = [];

  draggedTask: string = '';
  sourceList: string = '';

  addTask() {
    if (this.taskName.trim()) {
      this.todoTasks.push(this.taskName);
      this.taskName = '';
    }
  }

  onDragStart(event: DragEvent, task: string, listType: string) {
    this.draggedTask = task;
    this.sourceList = listType;
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(event: DragEvent, targetList: string) {
    if (this.sourceList === targetList) return;

    this.removeTaskFromList(this.draggedTask, this.sourceList);

    if (targetList === 'todo') {
      this.todoTasks.push(this.draggedTask);
    } else if (targetList === 'inProgress') {
      this.inProgressTasks.push(this.draggedTask);
    } else if (targetList === 'done') {
      this.doneTasks.push(this.draggedTask);
    }

    this.draggedTask = '';
    this.sourceList = '';
  }

  removeTaskFromList(task: string, list: string) {
    if (list === 'todo') {
      this.todoTasks = this.todoTasks.filter(t => t !== task);
    } else if (list === 'inProgress') {
      this.inProgressTasks = this.inProgressTasks.filter(t => t !== task);
    } else if (list === 'done') {
      this.doneTasks = this.doneTasks.filter(t => t !== task);
    }
  }
}
