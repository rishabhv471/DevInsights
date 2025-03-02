import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="product-card card">
      <div class="product-thumbnail">
        <img [src]="product.thumbnail" [alt]="product.name">
        <span class="category-badge">{{product.category}}</span>
      </div>
      
      <div class="product-info">
        <h3 class="product-name">
          <a [routerLink]="['/product', product.id]">{{product.name}}</a>
        </h3>
        <p class="product-tagline">{{product.tagline}}</p>
        
        <div class="product-meta">
          <div class="votes">
            <i class="fas fa-arrow-up"></i>
            <span>{{product.votesCount}}</span>
          </div>
          
          <div class="comments">
            <i class="fas fa-comment"></i>
            <span>{{product.commentsCount}}</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .product-card {
      height: 100%;
      display: flex;
      flex-direction: column;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      overflow: hidden;
    }
    
    .product-thumbnail {
      position: relative;
      height: 180px;
      overflow: hidden;
    }
    
    .product-thumbnail img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }
    
    .product-card:hover .product-thumbnail img {
      transform: scale(1.05);
    }
    
    .category-badge {
      position: absolute;
      top: 10px;
      right: 10px;
      background-color: var(--primary-color);
      color: white;
      padding: 4px 8px;
      border-radius: 20px;
      font-size: 0.7rem;
      font-weight: 500;
    }
    
    .product-info {
      padding: 15px;
      flex-grow: 1;
      display: flex;
      flex-direction: column;
    }
    
    .product-name {
      font-size: 1.1rem;
      margin-bottom: 8px;
    }
    
    .product-name a {
      color: var(--text-color);
      text-decoration: none;
      transition: color 0.3s ease;
    }
    
    .product-name a:hover {
      color: var(--primary-color);
    }
    
    .product-tagline {
      font-size: 0.9rem;
      color: var(--text-color);
      opacity: 0.8;
      margin-bottom: 15px;
      flex-grow: 1;
    }
    
    .product-meta {
      display: flex;
      justify-content: space-between;
      font-size: 0.85rem;
      color: var(--text-color);
      opacity: 0.7;
    }
    
    .votes, .comments {
      display: flex;
      align-items: center;
      gap: 5px;
    }
    
    .votes i {
      color: var(--primary-color);
    }
  `]
})
export class ProductCardComponent {
  @Input() product!: Product;
}