import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="bg-white dark:bg-gray-800 shadow-md mt-12">
      <div class="container mx-auto px-4 py-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <!-- Brand -->
          <div class="col-span-1 md:col-span-2">
            <div class="flex items-center space-x-2 mb-4">
              <svg class="w-8 h-8 text-primary-600 dark:text-primary-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
              <span class="text-xl font-bold text-gray-900 dark:text-white">DevInsights</span>
            </div>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              Your daily source for AI, development, and tech innovation. Stay updated with the latest insights and trends.
            </p>
          </div>

          <!-- Quick Links -->
          <div>
            <h3 class="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Quick Links</h3>
            <ul class="space-y-2">
              <li>
                <a href="/" 
                   class="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">
                  Home
                </a>
              </li>
              <li>
                <a href="/blog" 
                   class="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">
                  Blog
                </a>
              </li>
              <li>
                <a href="/about" 
                   class="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">
                  About
                </a>
              </li>
            </ul>
          </div>

          <!-- Contact -->
          <div>
            <h3 class="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Contact</h3>
            <ul class="space-y-2">
              <li>
                <a href="mailto:rishabhv471&#64;gmail.com" 
                   class="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">
                  rishabhv471&#64;gmail.com
                </a>
              </li>
              <li>
                <a href="https://github.com/rishabhv471" target="_blank" rel="noopener noreferrer"
                   class="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 flex items-center">
                  <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  GitHub
                </a>
              </li>
              <li>
                <a href="https://twitter.com/rishabhv471" target="_blank" rel="noopener noreferrer"
                   class="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">
                  &#64;rishabhv471
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div class="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8 text-center">
          <p class="text-gray-600 dark:text-gray-300">
            © {{currentYear}} DevInsights. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}