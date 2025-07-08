import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tasks-summary',
  imports: [],
  templateUrl: './tasks-summary.component.html',
  styleUrl: './tasks-summary.component.css'
})
export class TasksSummaryComponent {
  @Input() todoTasks: string[] = [];
  @Input() inProgressTasks: string[] = [];
  @Input() doneTasks: string[] = [];
}
