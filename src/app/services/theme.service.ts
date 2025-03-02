import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private darkMode = new BehaviorSubject<boolean>(this.isDarkModePreferred());
  isDarkMode$ = this.darkMode.asObservable();

  constructor() {
    // Initialize theme
    this.setTheme(this.darkMode.value);
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      this.darkMode.next(e.matches);
      this.setTheme(e.matches);
    });
  }

  private isDarkModePreferred(): boolean {
    // Check localStorage first
    const stored = localStorage.getItem('darkMode');
    if (stored !== null) {
      return stored === 'true';
    }
    // Fall back to system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  toggleTheme(): void {
    const newValue = !this.darkMode.value;
    this.darkMode.next(newValue);
    this.setTheme(newValue);
    localStorage.setItem('darkMode', String(newValue));
  }

  private setTheme(isDark: boolean): void {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
}