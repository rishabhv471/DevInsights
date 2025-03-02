import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, ThemeToggleComponent],
  template: `
    <header class="fixed w-full top-0 z-50 bg-white dark:bg-gray-800 shadow-md">
      <nav class="container mx-auto px-4">
        <div class="flex items-center justify-between h-16">
          <!-- Logo and Brand -->
          <div class="flex items-center space-x-4">
            <a [routerLink]="['/']" class="flex items-center space-x-2">
              <svg class="w-8 h-8 text-primary-600 dark:text-primary-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
              <span class="text-xl font-bold text-gray-900 dark:text-white">DevInsights</span>
            </a>
          </div>

          <!-- Navigation Links -->
          <div class="hidden md:flex items-center space-x-8 mr-[134px]">
            <a [routerLink]="['/']" 
               routerLinkActive="text-primary-600 dark:text-primary-400"
               [routerLinkActiveOptions]="{exact: true}"
               class="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
              Home
            </a>
            <a [routerLink]="['/blog']" 
               routerLinkActive="text-primary-600 dark:text-primary-400"
               class="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
              Blog
            </a>
            <a [routerLink]="['/about']" 
               routerLinkActive="text-primary-600 dark:text-primary-400"
               class="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
              About
            </a>
            <a href="https://github.com/rishabhv471" 
               target="_blank" 
               rel="noopener noreferrer"
               class="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors flex items-center">
              <svg class="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </a>
          </div>

          <!-- Right Side Actions -->
          <div class="flex items-center space-x-4">
            <app-theme-toggle></app-theme-toggle>
            <!-- Mobile Menu Button -->
            <button 
              (click)="toggleMobileMenu()"
              class="md:hidden p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path *ngIf="!isMobileMenuOpen" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="2" 
                      d="M4 6h16M4 12h16M4 18h16"/>
                <path *ngIf="isMobileMenuOpen" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="2" 
                      d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Mobile Menu -->
        <div *ngIf="isMobileMenuOpen" class="md:hidden">
          <div class="px-2 pt-2 pb-3 space-y-1">
            <a [routerLink]="['/']" 
               (click)="closeMobileMenu()"
               routerLinkActive="bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400"
               [routerLinkActiveOptions]="{exact: true}"
               class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 
                      hover:bg-gray-100 dark:hover:bg-gray-700">
              Home
            </a>
            <a [routerLink]="['/blog']" 
               (click)="closeMobileMenu()"
               routerLinkActive="bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400"
               class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 
                      hover:bg-gray-100 dark:hover:bg-gray-700">
              Blog
            </a>
            <a [routerLink]="['/about']" 
               (click)="closeMobileMenu()"
               routerLinkActive="bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400"
               class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 
                      hover:bg-gray-100 dark:hover:bg-gray-700">
              About
            </a>
            <a href="https://github.com/rishabhv471" 
               target="_blank" 
               rel="noopener noreferrer"
               (click)="closeMobileMenu()"
               class="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 
                      hover:bg-gray-100 dark:hover:bg-gray-700">
              <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </a>
          </div>
        </div>
      </nav>
    </header>
    <!-- Spacer for fixed header -->
    <div class="h-16"></div>
  `
})
export class HeaderComponent {
  isMobileMenuOpen = false;

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
  }
}