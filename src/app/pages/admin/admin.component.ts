import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BlogService } from '../../services/blog.service';
import { BlogPost } from '../../models/blog.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="admin-page">
      <h1>Admin Dashboard</h1>
      
      <div class="admin-tabs">
        <button 
          [class.active]="activeTab === 'blogs'" 
          (click)="activeTab = 'blogs'"
        >
          Blog Posts
        </button>
        <button 
          [class.active]="activeTab === 'analytics'" 
          (click)="activeTab = 'analytics'"
        >
          Analytics
        </button>
      </div>
      
      <div class="tab-content">
        <div *ngIf="activeTab === 'blogs'" class="blogs-tab">
          <div class="tab-header">
            <h2>Manage Blog Posts</h2>
            <div class="search-box">
              <i class="fas fa-search"></i>
              <input 
                type="text" 
                [(ngModel)]="searchQuery" 
                (keyup)="filterBlogs()"
                placeholder="Search blogs..."
              >
            </div>
          </div>
          
          <div *ngIf="loading" class="loading"></div>
          
          <div *ngIf="!loading && filteredBlogs.length === 0" class="no-results">
            <p>No blog posts found.</p>
          </div>
          
          <div *ngIf="!loading && filteredBlogs.length > 0" class="blogs-table">
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Created</th>
                  <th>Views</th>
                  <th>Likes</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let blog of filteredBlogs">
                  <td>{{blog.title}}</td>
                  <td>{{formatDate(blog.createdAt)}}</td>
                  <td>{{blog.views}}</td>
                  <td>{{blog.likes}}</td>
                  <td class="actions">
                    <a [routerLink]="['/blog', blog.id]" class="action-btn view-btn">
                      <i class="fas fa-eye"></i>
                    </a>
                    <button class="action-btn edit-btn" (click)="editBlog(blog)">
                      <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-btn delete-btn" (click)="deleteBlog(blog.id)">
                      <i class="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div *ngIf="activeTab === 'analytics'" class="analytics-tab">
          <h2>Blog Analytics</h2>
          
          <div class="analytics-cards">
            <div class="analytics-card">
              <div class="card-icon">
                <i class="fas fa-file-alt"></i>
              </div>
              <div class="card-content">
                <h3>Total Posts</h3>
                <p class="card-value">{{blogs.length}}</p>
              </div>
            </div>
            
            <div class="analytics-card">
              <div class="card-icon">
                <i class="fas fa-eye"></i>
              </div>
              <div class="card-content">
                <h3>Total Views</h3>
                <p class="card-value">{{totalViews}}</p>
              </div>
            </div>
            
            <div class="analytics-card">
              <div class="card-icon">
                <i class="fas fa-heart"></i>
              </div>
              <div class="card-content">
                <h3>Total Likes</h3>
                <p class="card-value">{{totalLikes}}</p>
              </div>
            </div>
          </div>
          
          <div class="top-posts">
            <h3>Top Performing Posts</h3>
            
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Views</th>
                  <th>Likes</th>
                  <th>Engagement Rate</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let blog of topBlogs">
                  <td>{{blog.title}}</td>
                  <td>{{blog.views}}</td>
                  <td>{{blog.likes}}</td>
                  <td>{{calculateEngagementRate(blog)}}%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .admin-page {
      padding-bottom: 40px;
    }
    
    .admin-page h1 {
      font-size: 2rem;
      margin-bottom: 20px;
    }
    
    .admin-tabs {
      display: flex;
      border-bottom: 1px solid var(--border-color);
      margin-bottom: 20px;
    }
    
    .admin-tabs button {
      padding: 10px 20px;
      background: none;
      border: none;
      border-bottom: 2px solid transparent;
      color: var(--text-color);
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    .admin-tabs button.active {
      border-bottom-color: var(--primary-color);
      color: var(--primary-color);
    }
    
    .tab-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }
    
    .tab-header h2 {
      font-size: 1.5rem;
    }
    
    .search-box {
      display: flex;
      align-items: center;
      background-color: var(--card-bg);
      border: 1px solid var(--border-color);
      border-radius: 4px;
      padding: 5px 10px;
      width: 250px;
    }
    
    .search-box i {
      color: var(--text-color);
      opacity: 0.5;
      margin-right: 10px;
    }
    
    .search-box input {
      border: none;
      background: transparent;
      color: var(--text-color);
      width: 100%;
      outline: none;
    }
    
    .no-results {
      text-align: center;
      padding: 40px 0;
      color: var(--text-color);
      opacity: 0.7;
    }
    
    table {
      width: 100%;
      border-collapse: collapse;
      background-color: var(--card-bg);
      border-radius: 8px;
      overflow: hidden;
      box-shadow: var(--shadow);
    }
    
    th, td {
      padding: 12px 15px;
      text-align: left;
      border-bottom: 1px solid var(--border-color);
    }
    
    th {
      background-color: rgba(0, 0, 0, 0.05);
      font-weight: 600;
    }
    
    tr:last-child td {
      border-bottom: none;
    }
    
    .actions {
      display: flex;
      gap: 10px;
    }
    
    .action-btn {
      width: 32px;
      height: 32px;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    .view-btn {
      background-color: #3498db;
      color: white;
    }
    
    .edit-btn {
      background-color: #2ecc71;
      color: white;
    }
    
    .delete-btn {
      background-color: #e74c3c;
      color: white;
    }
    
    .action-btn:hover {
      opacity: 0.8;
    }
    
    .analytics-cards {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 20px;
      margin-bottom: 30px;
    }
    
    .analytics-card {
      background-color: var(--card-bg);
      border-radius: 8px;
      box-shadow: var(--shadow);
      padding: 20px;
      display: flex;
      align-items: center;
    }
    
    .card-icon {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background-color: rgba(218, 85, 47, 0.1);
      color: var(--primary-color);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      margin-right: 15px;
    }
    
    .card-content h3 {
      font-size: 1rem;
      margin-bottom: 5px;
      opacity: 0.8;
    }
    
    .card-value {
      font-size: 1.8rem;
      font-weight: 600;
    }
    
    .top-posts {
      margin-top: 30px;
    }
    
    .top-posts h3 {
      font-size: 1.3rem;
      margin-bottom: 15px;
    }
    
    @media (max-width: 768px) {
      .tab-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 10px;
      }
      
      .search-box {
        width: 100%;
      }
      
      table {
        display: block;
        overflow-x: auto;
      }
    }
  `]
})
export class AdminComponent implements OnInit {
  activeTab = 'blogs';
  blogs: BlogPost[] = [];
  filteredBlogs: BlogPost[] = [];
  loading = true;
  searchQuery = '';
  
  constructor(private blogService: BlogService) {}

  ngOnInit() {
    this.loadBlogs();
  }

  loadBlogs() {
    this.loading = true;
    this.blogService.getBlogPosts().subscribe(blogs => {
      this.blogs = blogs;
      this.filteredBlogs = [...blogs];
      this.loading = false;
    });
  }

  filterBlogs() {
    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase();
      this.filteredBlogs = this.blogs.filter(blog => 
        blog.title.toLowerCase().includes(query) || 
        blog.excerpt.toLowerCase().includes(query)
      );
    } else {
      this.filteredBlogs = [...this.blogs];
    }
  }

  editBlog(blog: BlogPost) {
    // In a real application, this would open a modal or navigate to an edit page
    alert(`Edit functionality would be implemented here for blog: ${blog.title}`);
  }

  deleteBlog(id: string) {
    if (confirm('Are you sure you want to delete this blog post?')) {
      this.blogService.deleteBlogPost(id).subscribe(success => {
        if (success) {
          this.blogs = this.blogs.filter(blog => blog.id !== id);
          this.filteredBlogs = this.filteredBlogs.filter(blog => blog.id !== id);
        }
      });
    }
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  }

  get totalViews(): number {
    return this.blogs.reduce((sum, blog) => sum + blog.views, 0);
  }

  get totalLikes(): number {
    return this.blogs.reduce((sum, blog) => sum + blog.likes, 0);
  }

  get topBlogs(): BlogPost[] {
    return [...this.blogs]
      .sort((a, b) => b.views - a.views)
      .slice(0, 5);
  }

  calculateEngagementRate(blog: BlogPost): string {
    if (blog.views === 0) return '0';
    return ((blog.likes / blog.views) * 100).toFixed(1);
  }
}