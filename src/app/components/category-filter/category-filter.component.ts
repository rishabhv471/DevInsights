import { Component, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-filter',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="category-filter">
      <h3>Categories</h3>
      <ul class="category-list">
        <li 
          *ngFor="let category of categories" 
          [class.active]="selectedCategory === category"
          (click)="selectCategory(category)"
        >
          {{category}}
        </li>
      </ul>
    </div>
  `,
  styles: [`
    .category-filter {
      margin-bottom: 20px;
    }
    
    .category-filter h3 {
      font-size: 1.1rem;
      margin-bottom: 10px;
      color: var(--text-color);
    }
    
    .category-list {
      list-style: none;
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }
    
    .category-list li {
      padding: 5px 12px;
      background-color: var(--card-bg);
      border: 1px solid var(--border-color);
      border-radius: 20px;
      font-size: 0.9rem;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    .category-list li:hover {
      border-color: var(--primary-color);
    }
    
    .category-list li.active {
      background-color: var(--primary-color);
      color: white;
      border-color: var(--primary-color);
    }
  `]
})
export class CategoryFilterComponent {
  @Input() categories: string[] = [
    'All',
    'Productivity',
    'Artificial Intelligence',
    'Design Tools',
    'Marketing',
    'Developer Tools'
  ];
  
  @Input() selectedCategory = 'All';
  @Output() categorySelected = new EventEmitter<string>();

  selectCategory(category: string) {
    this.selectedCategory = category;
    this.categorySelected.emit(category);
  }
}