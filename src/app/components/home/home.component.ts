import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TasksSummaryComponent } from '../tasks-summary/tasks-summary.component';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule, TasksSummaryComponent],
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

  moveTask(task: string, from: 'todo' | 'inProgress' | 'done', to: 'todo' | 'inProgress' | 'done') {
    if (from === to) return;

    // Remove from source
    if (from === 'todo') {
      this.todoTasks = this.todoTasks.filter(t => t !== task);
    } else if (from === 'inProgress') {
      this.inProgressTasks = this.inProgressTasks.filter(t => t !== task);
    } else if (from === 'done') {
      this.doneTasks = this.doneTasks.filter(t => t !== task);
    }

    // Add to target
    if (to === 'todo') {
      this.todoTasks.push(task);
    } else if (to === 'inProgress') {
      this.inProgressTasks.push(task);
    } else if (to === 'done') {
      this.doneTasks.push(task);
      this.playCompletedSound();
    }
  }


  onDragStart(event: DragEvent, task: string, listType: string) {
    this.draggedTask = task;
    this.sourceList = listType;
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    const target = event.currentTarget as HTMLElement;
    target.classList.remove('drag-over');
  }

  onDrop(event: DragEvent, targetList: string) {

    event.preventDefault();
    const target = event.currentTarget as HTMLElement;
    target.classList.remove('drag-over');

    if (this.sourceList === targetList) return;

    this.removeTaskFromList(this.draggedTask, this.sourceList);

    if (targetList === 'todo') {
      this.todoTasks.push(this.draggedTask);
    } else if (targetList === 'inProgress') {
      this.inProgressTasks.push(this.draggedTask);
    } else if (targetList === 'done') {
      this.doneTasks.push(this.draggedTask);
      this.playCompletedSound();
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

  playCompletedSound() {
    console.log("play sound");
    const audio = new Audio('/assets/completed1.mp3');
    audio.play().catch(error => console.error('Playback failed:', error));
  }
}
