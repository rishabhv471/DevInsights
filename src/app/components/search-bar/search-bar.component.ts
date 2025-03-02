import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="search-container">
      <div class="search-bar">
        <i class="fas fa-search search-icon"></i>
        <input 
          type="text" 
          [(ngModel)]="searchQuery" 
          (keyup.enter)="search()"
          placeholder="Search products..."
          class="search-input"
        >
        <button *ngIf="searchQuery" (click)="clearSearch()" class="clear-button">
          <i class="fas fa-times"></i>
        </button>
      </div>
    </div>
  `,
  styles: [`
    .search-container {
      margin-bottom: 20px;
      width: 100%;
    }
    
    .search-bar {
      display: flex;
      align-items: center;
      background-color: var(--card-bg);
      border: 1px solid var(--border-color);
      border-radius: 30px;
      padding: 8px 15px;
      transition: box-shadow 0.3s ease;
      position: relative;
    }
    
    .search-bar:focus-within {
      box-shadow: 0 0 0 2px var(--primary-color);
    }
    
    .search-icon {
      color: var(--text-color);
      opacity: 0.5;
      margin-right: 10px;
    }
    
    .search-input {
      flex-grow: 1;
      border: none;
      background: transparent;
      color: var(--text-color);
      font-size: 1rem;
      outline: none;
    }
    
    .clear-button {
      background: none;
      border: none;
      color: var(--text-color);
      opacity: 0.5;
      cursor: pointer;
      padding: 5px;
    }
    
    .clear-button:hover {
      opacity: 1;
    }
  `]
})
export class SearchBarComponent {
  @Output() searchEvent = new EventEmitter<string>();
  searchQuery = '';

  search() {
    this.searchEvent.emit(this.searchQuery);
  }

  clearSearch() {
    this.searchQuery = '';
    this.searchEvent.emit('');
  }
}