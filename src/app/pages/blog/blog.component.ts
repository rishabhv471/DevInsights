import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductHuntService } from '../../services/product-hunt.service';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { Observable, Subject, shareReplay, takeUntil, catchError, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
    HeaderComponent,
    FooterComponent
  ],
  template: `
    <div class="flex flex-col min-h-screen">
      <app-header></app-header>

      <main class="flex-grow bg-gray-50 dark:bg-gray-900">
        <!-- Hero Section -->
        <section class="bg-white dark:bg-gray-800 py-12">
          <div class="container mx-auto px-4">
            <div class="max-w-3xl mx-auto text-center">
              <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Tech Insights & Innovations
              </h1>
              <p class="text-lg text-gray-600 dark:text-gray-300">
                Explore our collection of in-depth articles about the latest tech trends and innovations
              </p>
            </div>

            <!-- Search Bar -->
            <div class="max-w-2xl mx-auto mt-8">
              <div class="relative">
                <input
                  type="text"
                  [(ngModel)]="searchQuery"
                  (input)="onSearch()"
                  placeholder="Search articles..."
                  class="w-full px-4 py-3 pl-12 rounded-lg border border-gray-300 dark:border-gray-600 
                         bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                         focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <svg
                  class="absolute left-4 top-3.5 h-5 w-5 text-gray-400 dark:text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </section>

        <!-- Blog Grid -->
        <section class="py-12">
          <div class="container mx-auto px-4">
            <!-- Loading State -->
            <div *ngIf="loading" class="flex justify-center items-center py-12">
              <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
            </div>

            <!-- Error State -->
            <div *ngIf="error" class="text-center py-12">
              <p class="text-red-600 dark:text-red-400">{{ error }}</p>
              <button
                (click)="loadPosts()"
                class="mt-4 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                Try Again
              </button>
            </div>

            <!-- Blog Posts Grid -->
            <div *ngIf="!loading && !error" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <ng-container *ngIf="filteredPosts$ | async as posts">
                <div *ngFor="let post of posts"
                     class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <a [routerLink]="['/blog', post.id]" class="block">
                    <img [src]="post.thumbnail" [alt]="post.title" 
                         class="w-full h-48 object-cover hover:opacity-90 transition-opacity">
                    <div class="p-6">
                      <div class="flex items-center justify-between mb-2">
                        <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
                          {{ post.title }}
                        </h2>
                      </div>
                      <p class="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                        {{ post.excerpt }}
                      </p>
                      <div class="flex items-center justify-between">
                        <span class="text-sm text-gray-500 dark:text-gray-400">
                          {{ post.date | date }}
                        </span>
                        <div class="flex items-center space-x-2">
                          <span class="text-sm text-primary-600 dark:text-primary-400">
                            {{ post.votesCount }} votes
                          </span>
                        </div>
                      </div>
                      <!-- Tags -->
                      <div class="mt-4 flex flex-wrap gap-2">
                        <span *ngFor="let topic of post.topics"
                              class="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded">
                          {{ topic }}
                        </span>
                      </div>
                      <!-- Attribution -->
                      <div class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <div class="flex items-center justify-between">
                          <a [href]="post.productHuntUrl" 
                             target="_blank" 
                             rel="noopener noreferrer" 
                             class="text-sm text-primary-600 dark:text-primary-400 hover:underline flex items-center">
                            <svg class="w-4 h-4 mr-1" viewBox="0 0 40 40" fill="currentColor">
                              <path d="M20 40C31.0457 40 40 31.0457 40 20C40 8.9543 31.0457 0 20 0C8.9543 0 0 8.9543 0 20C0 31.0457 8.9543 40 20 40Z"/>
                              <path fill="white" d="M20.0195 27.0086L11.3286 31.9925L13.5449 22.3796L6.55545 15.7755L16.2921 14.7128L20.0195 5.71436L23.7469 14.7128L33.4835 15.7755L26.4941 22.3796L28.7104 31.9925L20.0195 27.0086Z"/>
                            </svg>
                            View on Product Hunt
                          </a>
                          <span class="text-xs text-gray-500 dark:text-gray-400">
                            By {{ post.maker }}
                          </span>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              </ng-container>
            </div>

            <!-- No Results -->
            <div *ngIf="(filteredPosts$ | async)?.length === 0" class="text-center py-12">
              <p class="text-gray-600 dark:text-gray-300">No posts found matching your search.</p>
            </div>
          </div>
        </section>

        <!-- Attribution Footer -->
        <section class="bg-white dark:bg-gray-800 py-8 mt-12">
          <div class="container mx-auto px-4">
            <div class="text-center">
              <p class="text-gray-600 dark:text-gray-300 mb-4">
                Powered by Product Hunt API - Bringing you the latest tech innovations
              </p>
              <div class="flex justify-center space-x-6">
                <a href="https://github.com/rishabhv471" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
                  <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd"/>
                  </svg>
                </a>
                <a href="https://instagram.com/rishabhv471" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
                  <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path fill-rule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clip-rule="evenodd"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>
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

    .line-clamp-2 {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  `]
})
export class BlogComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  searchQuery = '';
  loading = false;
  error: string | null = null;
  allPosts$: Observable<any[]>;
  filteredPosts$: Observable<any[]>;

  // Mock data to use as fallback
  private mockPosts = [
    {
      id: 'mock-1',
      title: 'AI-Powered Content Creation',
      excerpt: 'Create high-quality content with the help of advanced AI models',
      thumbnail: '/assets/images/placeholder.png',
      date: new Date(),
      votesCount: 120,
      topics: ['AI', 'Content Creation', 'Productivity'],
      productHuntUrl: 'https://www.producthunt.com',
      maker: 'AI Team'
    },
    {
      id: 'mock-2',
      title: 'Smart Task Management',
      excerpt: 'Organize your tasks with intelligent prioritization',
      thumbnail: '/assets/images/placeholder.png',
      date: new Date(),
      votesCount: 95,
      topics: ['Productivity', 'Task Management', 'AI'],
      productHuntUrl: 'https://www.producthunt.com',
      maker: 'Productivity Team'
    },
    {
      id: 'mock-3',
      title: 'Video Generation Platform',
      excerpt: 'Create professional videos with just a few clicks',
      thumbnail: '/assets/images/placeholder.png',
      date: new Date(),
      votesCount: 150,
      topics: ['Video', 'AI', 'Content Creation'],
      productHuntUrl: 'https://www.producthunt.com',
      maker: 'Video Team'
    }
  ];

  constructor(private productHuntService: ProductHuntService) {
    // Cache the API response using shareReplay
    this.allPosts$ = this.productHuntService.getTodayPosts().pipe(
      map(response => {
        console.log('Processing ProductHunt response:', response);
        if (!response.data || !response.data.posts || !response.data.posts.edges) {
          console.error('Invalid response format from ProductHunt API:', response);
          throw new Error('Invalid response format from ProductHunt API');
        }
        return response.data.posts.edges.map((edge: any) => ({
          id: edge.node.id,
          title: edge.node.name,
          excerpt: edge.node.tagline,
          thumbnail: edge.node.media[0]?.url || '/assets/images/placeholder.png',
          date: new Date(),
          votesCount: edge.node.votesCount,
          topics: edge.node.topics.edges.map((t: any) => t.node.name),
          productHuntUrl: `https://www.producthunt.com/posts/${edge.node.slug}`,
          maker: edge.node.user?.name || 'Anonymous'
        }));
      }),
      catchError(err => {
        console.error('Error processing ProductHunt data:', err);
        this.error = 'Failed to load posts from ProductHunt. Showing fallback content.';
        return of(this.mockPosts);
      }),
      shareReplay(1) // Cache the response
    );
    this.filteredPosts$ = this.allPosts$;
  }

  ngOnInit(): void {
    this.loadPosts();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadPosts(): void {
    if (this.loading) return; // Prevent multiple simultaneous loads
    
    this.loading = true;
    this.error = null;
    
    this.allPosts$.pipe(
      takeUntil(this.destroy$) // Cleanup subscription on destroy
    ).subscribe({
      next: (posts) => {
        console.log('Loaded posts:', posts);
        this.loading = false;
        if (posts.length === 0) {
          this.error = 'No posts found. Using fallback content.';
          // Use mock data if no posts were found
          this.allPosts$ = of(this.mockPosts);
          this.filteredPosts$ = this.allPosts$;
        }
      },
      error: (err) => {
        console.error('Error loading posts:', err);
        this.error = 'Failed to load posts. Using fallback content.';
        this.loading = false;
        // Use mock data on error
        this.allPosts$ = of(this.mockPosts);
        this.filteredPosts$ = this.allPosts$;
      }
    });
  }

  onSearch(): void {
    const query = this.searchQuery.toLowerCase().trim();
    this.filteredPosts$ = this.allPosts$.pipe(
      map(posts => {
        if (!query) return posts;
        return posts.filter(post => 
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.topics.some((topic: string) => topic.toLowerCase().includes(query))
        );
      })
    );
  }
}