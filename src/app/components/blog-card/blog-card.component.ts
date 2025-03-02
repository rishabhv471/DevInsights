import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BlogPost } from '../../models/blog.model';

@Component({
  selector: 'app-blog-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="blog-card card">
      <div class="blog-thumbnail">
        <img [src]="blog.thumbnail" [alt]="blog.title">
      </div>
      
      <div class="blog-info">
        <h3 class="blog-title">
          <a [routerLink]="['/blog', blog.id]">{{blog.title}}</a>
        </h3>
        
        <p class="blog-excerpt">{{blog.excerpt}}</p>
        
        <div class="blog-meta">
          <div class="author">
            <i class="fas fa-user"></i>
            <span>{{blog.author}}</span>
          </div>
          
          <div class="date">
            <i class="fas fa-calendar"></i>
            <span>{{formatDate(blog.createdAt)}}</span>
          </div>
        </div>
        
        <div class="blog-stats">
          <div class="views">
            <i class="fas fa-eye"></i>
            <span>{{blog.views}}</span>
          </div>
          
          <div class="likes">
            <i class="fas fa-heart"></i>
            <span>{{blog.likes}}</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .blog-card {
      height: 100%;
      display: flex;
      flex-direction: column;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      overflow: hidden;
    }
    
    .blog-thumbnail {
      height: 180px;
      overflow: hidden;
    }
    
    .blog-thumbnail img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }
    
    .blog-card:hover .blog-thumbnail img {
      transform: scale(1.05);
    }
    
    .blog-info {
      padding: 15px;
      flex-grow: 1;
      display: flex;
      flex-direction: column;
    }
    
    .blog-title {
      font-size: 1.1rem;
      margin-bottom: 8px;
    }
    
    .blog-title a {
      color: var(--text-color);
      text-decoration: none;
      transition: color 0.3s ease;
    }
    
    .blog-title a:hover {
      color: var(--primary-color);
    }
    
    .blog-excerpt {
      font-size: 0.9rem;
      color: var(--text-color);
      opacity: 0.8;
      margin-bottom: 15px;
      flex-grow: 1;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    
    .blog-meta {
      display: flex;
      justify-content: space-between;
      font-size: 0.8rem;
      color: var(--text-color);
      opacity: 0.7;
      margin-bottom: 10px;
    }
    
    .blog-stats {
      display: flex;
      justify-content: space-between;
      font-size: 0.8rem;
      color: var(--text-color);
      opacity: 0.7;
    }
    
    .author, .date, .views, .likes {
      display: flex;
      align-items: center;
      gap: 5px;
    }
    
    .likes i {
      color: var(--primary-color);
    }
  `]
})
export class BlogCardComponent {
  @Input() blog!: BlogPost;

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  }
}