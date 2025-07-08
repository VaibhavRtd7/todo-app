import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from "./components/home/home.component";
import { FooterComponent } from './components/footer/footer.component';
import { TasksSummaryComponent } from './components/tasks-summary/tasks-summary.component';

@Component({
  selector: 'app-root',
  imports: [HomeComponent, FooterComponent, TasksSummaryComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'task';
}
