import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ProjectDiagramComponent } from '../../components/project-diagram/project-diagram.component';
import { ApiIntegrationInfoComponent } from '../../components/api-integration-info/api-integration-info.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
    ProjectDiagramComponent,
    ApiIntegrationInfoComponent
  ],
  template: `
    <div class="flex flex-col min-h-screen">
      <app-header></app-header>

      <main class="flex-grow bg-gray-50 dark:bg-gray-900">
        <div class="container mx-auto px-4 py-12">
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div class="p-6 md:p-8">
              <!-- Profile Section -->
              <div class="flex flex-col md:flex-row items-center md:items-start gap-8">
                <!-- Profile Image -->
                <div class="w-48 h-48 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 flex-shrink-0">
                  <img 
                    src="/assets/images/placeholder.png" 
                    alt="Rishabh Verma" 
                    class="w-full h-full object-cover"
                  >
                </div>
                
                <!-- Profile Info -->
                <div class="flex-grow text-center md:text-left">
                  <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Rishabh Verma</h1>
                  <p class="text-xl text-gray-600 dark:text-gray-300 mb-4">Full Stack Developer</p>
                  
                  <p class="text-gray-700 dark:text-gray-300 mb-6 max-w-2xl">
                    Passionate developer with expertise in building modern web applications.
                    Skilled in frontend and backend technologies, with a focus on creating
                    intuitive and responsive user experiences.
                  </p>
                  
                  <!-- Social Links -->
                  <div class="flex flex-wrap justify-center md:justify-start gap-4">
                    <a 
                      href="https://github.com/rishabhv471" 
                      target="_blank" 
                      class="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      GitHub
                    </a>
                    
                    <a 
                      href="https://www.linkedin.com/in/rishabh-verma-0811/" 
                      target="_blank" 
                      class="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                      LinkedIn
                    </a>
                    
                    <a 
                      href="https://www.instagram.com/rishabhv471/" 
                      target="_blank" 
                      class="flex items-center gap-2 px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
                    >
                      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                      Instagram
                    </a>
                  </div>
                </div>
              </div>
              
              <hr class="my-8 border-gray-200 dark:border-gray-700">
              
              <!-- Project Diagram Section -->
              <app-project-diagram class="mb-8"></app-project-diagram>
              
              <hr class="my-8 border-gray-200 dark:border-gray-700">
              
              <!-- API Integration Info Section -->
              <app-api-integration-info class="mb-8"></app-api-integration-info>
              
              <hr class="my-8 border-gray-200 dark:border-gray-700">
              
              <!-- Contact Section -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Contact Information</h2>
                  
                  <div class="space-y-4">
                    <div class="flex items-start gap-3">
                      <svg class="w-6 h-6 text-primary-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <div>
                        <p class="text-sm text-gray-500 dark:text-gray-400">Email</p>
                        <a href="mailto:rishabhv471&#64;gmail.com" class="text-primary-600 hover:underline">rishabhv471&#64;gmail.com</a>
                      </div>
                    </div>
                    
                    <div class="flex items-start gap-3">
                      <svg class="w-6 h-6 text-primary-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <div>
                        <p class="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                        <a href="tel:+1234567890" class="text-primary-600 hover:underline">+91 6396647662</a>
                      </div>
                    </div>
                    
                    <div class="flex items-start gap-3">
                      <svg class="w-6 h-6 text-primary-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <div>
                        <p class="text-sm text-gray-500 dark:text-gray-400">Location</p>
                        <p class="text-gray-700 dark:text-gray-300">New Delhi, India</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <!-- Contact Form -->
                <div>
                  <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Send Me a Message</h2>
                  
                  <form class="space-y-4">
                    <div>
                      <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Your Name</label>
                      <input 
                        type="text" 
                        id="name" 
                        class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="John Doe"
                      >
                    </div>
                    
                    <div>
                      <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Your Email</label>
                      <input 
                        type="email" 
                        id="email" 
                        class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="john@example.com"
                      >
                    </div>
                    
                    <div>
                      <label for="message" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message</label>
                      <textarea 
                        id="message" 
                        rows="4" 
                        class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="Your message here..."
                      ></textarea>
                    </div>
                    
                    <button 
                      type="submit" 
                      class="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                    >
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <app-footer></app-footer>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
    
    :host ::ng-deep .container {
      max-width: 1280px;
      margin-left: auto;
      margin-right: auto;
    }
  `]
})
export class AboutComponent {
  constructor() {}
} 