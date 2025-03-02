import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { AIService } from '../../services/ai.service';
import { BlogService } from '../../services/blog.service';
import { Product } from '../../models/product.model';
import { BlogPost } from '../../models/blog.model';
import { BlogCardComponent } from '../../components/blog-card/blog-card.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, BlogCardComponent, FormsModule],
  template: `
    <div class="product-detail-page">
      <div *ngIf="loading" class="loading"></div>
      
      <div *ngIf="!loading && !product" class="not-found">
        <h2>Product Not Found</h2>
        <p>The product you're looking for doesn't exist or has been removed.</p>
        <a routerLink="/" class="btn btn-primary">Back to Home</a>
      </div>
      
      <div *ngIf="!loading && product" class="product-content">
        <div class="product-header">
          <div class="product-info">
            <h1>{{product.name}}</h1>
            <p class="tagline">{{product.tagline}}</p>
            
            <div class="product-meta">
              <span class="category">{{product.category}}</span>
              <div class="votes">
                <i class="fas fa-arrow-up"></i>
                <span>{{product.votesCount}} upvotes</span>
              </div>
            </div>
            
            <div class="actions">
              <a [href]="product.url" target="_blank" class="btn btn-primary">
                <i class="fas fa-external-link-alt"></i> Visit Website
              </a>
              
              <div class="share-buttons">
                <button class="share-btn" (click)="shareOnTwitter()">
                  <i class="fab fa-twitter"></i>
                </button>
                <button class="share-btn" (click)="shareOnFacebook()">
                  <i class="fab fa-facebook"></i>
                </button>
                <button class="share-btn" (click)="shareOnLinkedIn()">
                  <i class="fab fa-linkedin"></i>
                </button>
                <button class="share-btn" (click)="copyLink()">
                  <i class="fas fa-link"></i>
                </button>
              </div>
            </div>
          </div>
          
          <div class="product-image">
            <img [src]="product.thumbnail" [alt]="product.name">
          </div>
        </div>
        
        <div class="product-gallery" *ngIf="product.media && product.media.length > 0">
          <h2>Gallery</h2>
          <div class="gallery-grid">
            <div *ngFor="let image of product.media" class="gallery-item">
              <img [src]="image" [alt]="product.name">
            </div>
          </div>
        </div>
        
        <div class="product-description">
          <h2>About {{product.name}}</h2>
          <p>{{product.description}}</p>
        </div>
        
        <div class="tabs">
          <div class="tab-header">
            <button 
              [class.active]="activeTab === 'blog'" 
              (click)="activeTab = 'blog'"
            >
              AI Blog Post
            </button>
            <button 
              [class.active]="activeTab === 'script'" 
              (click)="activeTab = 'script'"
            >
              YouTube Script
            </button>
          </div>
          
          <div class="tab-content">
            <div *ngIf="activeTab === 'blog'" class="blog-tab">
              <div *ngIf="generatingBlog" class="loading"></div>
              
              <div *ngIf="!generatingBlog">
                <div class="tab-actions">
                  <button class="btn btn-secondary" (click)="generateBlogPost()">
                    <i class="fas fa-sync-alt"></i> Regenerate
                  </button>
                  <button class="btn btn-primary" (click)="saveBlogPost()">
                    <i class="fas fa-save"></i> Save to Blog
                  </button>
                </div>
                
                <div class="blog-preview">
                  <div [innerHTML]="formattedBlogPost"></div>
                </div>
              </div>
            </div>
            
            <div *ngIf="activeTab === 'script'" class="script-tab">
              <div *ngIf="generatingScript" class="loading"></div>
              
              <div *ngIf="!generatingScript">
                <div class="tab-actions">
                  <button class="btn btn-secondary" (click)="generateYouTubeScript()">
                    <i class="fas fa-sync-alt"></i> Regenerate
                  </button>
                  <button class="btn btn-primary" (click)="copyScript()">
                    <i class="fas fa-copy"></i> Copy Script
                  </button>
                  <button class="btn btn-secondary" (click)="downloadScript()">
                    <i class="fas fa-download"></i> Download
                  </button>
                </div>
                
                <div class="script-preview">
                  <div [innerHTML]="formattedScript"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="related-blogs" *ngIf="relatedBlogs.length > 0">
          <h2>Related Blog Posts</h2>
          <div class="blogs-grid grid">
            <app-blog-card 
              *ngFor="let blog of relatedBlogs" 
              [blog]="blog"
            ></app-blog-card>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .product-detail-page {
      padding-bottom: 40px;
    }
    
    .not-found {
      text-align: center;
      padding: 60px 0;
    }
    
    .not-found h2 {
      font-size: 2rem;
      margin-bottom: 15px;
    }
    
    .not-found p {
      margin-bottom: 20px;
      opacity: 0.8;
    }
    
    .product-header {
      display: flex;
      flex-wrap: wrap;
      gap: 30px;
      margin-bottom: 40px;
    }
    
    .product-info {
      flex: 1;
      min-width: 300px;
    }
    
    .product-info h1 {
      font-size: 2.5rem;
      margin-bottom: 10px;
    }
    
    .tagline {
      font-size: 1.2rem;
      opacity: 0.8;
      margin-bottom: 20px;
    }
    
    .product-meta {
      display: flex;
      align-items: center;
      gap: 15px;
      margin-bottom: 20px;
    }
    
    .category {
      background-color: var(--secondary-color);
      color: white;
      padding: 5px 10px;
      border-radius: 20px;
      font-size: 0.8rem;
    }
    
    .votes {
      display: flex;
      align-items: center;
      gap: 5px;
    }
    
    .votes i {
      color: var(--primary-color);
    }
    
    .actions {
      display: flex;
      align-items: center;
      gap: 15px;
      margin-top: 20px;
    }
    
    .share-buttons {
      display: flex;
      gap: 10px;
    }
    
    .share-btn {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--card-bg);
      border: 1px solid var(--border-color);
      color: var(--text-color);
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    .share-btn:hover {
      background-color: var(--primary-color);
      color: white;
    }
    
    .product-image {
      flex: 1;
      min-width: 300px;
      max-width: 500px;
    }
    
    .product-image img {
      width: 100%;
      border-radius: 8px;
      box-shadow: var(--shadow);
    }
    
    .product-gallery {
      margin-bottom: 40px;
    }
    
    .product-gallery h2 {
      font-size: 1.5rem;
      margin-bottom: 20px;
    }
    
    .gallery-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 15px;
    }
    
    .gallery-item {
      border-radius: 8px;
      overflow: hidden;
      box-shadow: var(--shadow);
    }
    
    .gallery-item img {
      width: 100%;
      height: 150px;
      object-fit: cover;
      transition: transform 0.3s ease;
    }
    
    .gallery-item:hover img {
      transform: scale(1.05);
    }
    
    .product-description {
      margin-bottom: 40px;
    }
    
    .product-description h2 {
      font-size: 1.5rem;
      margin-bottom: 15px;
    }
    
    .product-description p {
      line-height: 1.6;
    }
    
    .tabs {
      margin-bottom: 40px;
    }
    
    .tab-header {
      display: flex;
      border-bottom: 1px solid var(--border-color);
      margin-bottom: 20px;
    }
    
    .tab-header button {
      padding: 10px 20px;
      background: none;
      border: none;
      border-bottom: 2px solid transparent;
      color: var(--text-color);
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    .tab-header button.active {
      border-bottom-color: var(--primary-color);
      color: var(--primary-color);
    }
    
    .tab-actions {
      display: flex;
      gap: 10px;
      margin-bottom: 20px;
    }
    
    .blog-preview, .script-preview {
      background-color: var(--card-bg);
      padding: 20px;
      border-radius: 8px;
      box-shadow: var(--shadow);
      line-height: 1.6;
    }
    
    .blog-preview h1, .script-preview h1 {
      font-size: 1.8rem;
      margin-bottom: 15px;
    }
    
    .blog-preview h2, .script-preview h2 {
      font-size: 1.4rem;
      margin: 20px 0 10px;
    }
    
    .blog-preview p, .script-preview p {
      margin-bottom: 15px;
    }
    
    .blog-preview ul, .script-preview ul,
    .blog-preview ol, .script-preview ol {
      margin-left: 20px;
      margin-bottom: 15px;
    }
    
    .related-blogs h2 {
      font-size: 1.5rem;
      margin-bottom: 20px;
    }
    
    @media (max-width: 768px) {
      .product-info h1 {
        font-size: 2rem;
      }
      
      .product-header {
        flex-direction: column-reverse;
      }
      
      .product-image {
        max-width: 100%;
      }
    }
  `]
})
export class ProductDetailComponent implements OnInit {
  product: Product | null = null;
  loading = true;
  activeTab = 'blog';
  blogPost = '';
  youtubeScript = '';
  generatingBlog = false;
  generatingScript = false;
  relatedBlogs: BlogPost[] = [];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private aiService: AIService,
    private blogService: BlogService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.loadProduct(id);
      }
    });
  }

  loadProduct(id: string) {
    this.loading = true;
    this.productService.getProductById(id).subscribe(product => {
      this.product = product;
      this.loading = false;
      
      if (product) {
        this.generateBlogPost();
        this.generateYouTubeScript();
        this.loadRelatedBlogs(product.id);
      }
    });
  }

  loadRelatedBlogs(productId: string) {
    this.blogService.getBlogPostsByProductId(productId).subscribe(blogs => {
      this.relatedBlogs = blogs;
    });
  }

  generateBlogPost() {
    if (!this.product) return;
    
    this.generatingBlog = true;
    this.aiService.generateBlogPost(this.product).subscribe(blogPost => {
      this.blogPost = blogPost;
      this.generatingBlog = false;
    });
  }

  generateYouTubeScript() {
    if (!this.product) return;
    
    this.generatingScript = true;
    this.aiService.generateYouTubeScript(this.product).subscribe(script => {
      this.youtubeScript = script;
      this.generatingScript = false;
    });
  }

  saveBlogPost() {
    if (!this.product || !this.blogPost) return;
    
    const title = this.blogPost.split('\n')[0].replace('# ', '');
    const excerpt = this.blogPost.split('\n\n')[1].substring(0, 150) + '...';
    
    const newBlog: Omit<BlogPost, 'id'> = {
      title,
      content: this.blogPost,
      productId: this.product.id,
      thumbnail: this.product.thumbnail,
      excerpt,
      author: 'AI Assistant',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      views: 0,
      likes: 0
    };
    
    this.blogService.createBlogPost(newBlog).subscribe(id => {
      if (id) {
        alert('Blog post saved successfully!');
        this.loadRelatedBlogs(this.product!.id);
      }
    });
  }

  copyScript() {
    navigator.clipboard.writeText(this.youtubeScript).then(() => {
      alert('Script copied to clipboard!');
    });
  }

  downloadScript() {
    if (!this.product || !this.youtubeScript) return;
    
    const element = document.createElement('a');
    const file = new Blob([this.youtubeScript], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `${this.product.name.replace(/\s+/g, '-').toLowerCase()}-script.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  shareOnTwitter() {
    if (!this.product) return;
    
    const text = `Check out ${this.product.name}: ${this.product.tagline}`;
    const url = window.location.href;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
  }

  shareOnFacebook() {
    const url = window.location.href;
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
  }

  shareOnLinkedIn() {
    if (!this.product) return;
    
    const title = this.product.name;
    const summary = this.product.tagline;
    const url = window.location.href;
    window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(summary)}`, '_blank');
  }

  copyLink() {
    navigator.clipboard.writeText(window.location.href).then(() => {
      alert('Link copied to clipboard!');
    });
  }

  get formattedBlogPost() {
    if (!this.blogPost) return '';
    
    return this.blogPost
      .replace(/# (.*)/g, '<h1>$1</h1>')
      .replace(/## (.*)/g, '<h2>$1</h2>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n\n/g, '</p><p>')
      .replace(/\n/g, '<br>')
      .replace(/<p><h([1-6])>/g, '<h$1>')
      .replace(/<\/h([1-6])><\/p>/g, '</h$1>')
      .replace(/- (.*)/g, '<li>$1</li>')
      .replace(/<li>(.*?)<\/li>/g, '<ul><li>$1</li></ul>')
      .replace(/<\/ul><ul>/g, '')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>');
  }

  get formattedScript() {
    if (!this.youtubeScript) return '';
    
    return this.youtubeScript
      .replace(/# (.*)/g, '<h1>$1</h1>')
      .replace(/## (.*)/g, '<h2>$1</h2>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n\n/g, '</p><p>')
      .replace(/\n/g, '<br>')
      .replace(/<p><h([1-6])>/g, '<h$1>')
      .replace(/<\/h([1-6])><\/p>/g, '</h$1>')
      .replace(/- (.*)/g, '<li>$1</li>')
      .replace(/<li>(.*?)<\/li>/g, '<ul><li>$1</li></ul>')
      .replace(/<\/ul><ul>/g, '')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>');
  }
}