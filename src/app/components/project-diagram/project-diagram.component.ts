import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project-diagram',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="w-full overflow-hidden">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Project Architecture</h2>
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 overflow-auto">
        <img 
          src="/assets/images/project-diagram.svg" 
          alt="Project Architecture Diagram" 
          class="w-full max-w-4xl mx-auto"
        >
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class ProjectDiagramComponent {
  constructor() {}
} 