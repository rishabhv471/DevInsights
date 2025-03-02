import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductHuntService } from '../../services/product-hunt.service';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule, 
    RouterLink, 
    HeaderComponent,
    FooterComponent
  ],
  template: `
    <div class="flex flex-col min-h-screen">
      <app-header></app-header>

      <div class="flex-grow bg-gray-50 dark:bg-gray-900">
        <!-- Hero Section -->
        <section class="relative overflow-hidden bg-white dark:bg-gray-800">
          <div class="container mx-auto px-4 py-16 sm:py-24">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 class="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                  Stay Ahead in Tech with DevInsights
                </h1>
                <p class="text-lg text-gray-600 dark:text-gray-300 mb-8">
                  Discover the latest tech innovations, development trends, and industry insights. 
                  Our AI-powered platform curates high-quality content from Product Hunt's most 
                  exciting launches, providing you with in-depth analysis and practical insights.
                </p>
                <div class="flex flex-wrap gap-4">
                  <a [routerLink]="['/blog']" 
                     class="inline-flex items-center px-6 py-3 rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-colors">
                    Explore All Blogs
                    <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                    </svg>
                  </a>
                </div>
              </div>
              <div class="relative">
                <!-- Using Camilo Huinca's style illustration -->
                <div class="aspect-w-4 aspect-h-3 rounded-2xl overflow-hidden shadow-xl">
                  <img 
                    src="/assets/images/hero-illustration.png" 
                    alt="Tech Illustration" 
                    class="object-cover w-full h-full"
                  >
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Featured Posts Carousel -->
        <section class="py-16 bg-gray-100 dark:bg-gray-800">
          <div class="container mx-auto px-4">
            <div class="max-w-3xl mx-auto text-center mb-12">
              <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Featured Tech Insights
              </h2>
              <p class="text-gray-600 dark:text-gray-300">
                Explore our handpicked selection of the most innovative tech products
              </p>
            </div>

            <!-- Loading State -->
            <div *ngIf="loading" class="flex justify-center items-center py-12">
              <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
            </div>

            <!-- Error State -->
            <div *ngIf="error" class="text-center py-12">
              <p class="text-red-600 dark:text-red-400">{{ error }}</p>
              <button
                (click)="loadFeaturedPosts()"
                class="mt-4 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                Try Again
              </button>
            </div>

            <!-- Carousel -->
            <div *ngIf="!loading && !error" class="relative">
              <!-- Carousel Navigation -->
              <div class="absolute top-1/2 left-0 transform -translate-y-1/2 z-10">
                <button 
                  (click)="prevSlide()"
                  class="p-2 rounded-full bg-white dark:bg-gray-700 shadow-lg text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600 focus:outline-none"
                >
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
                  </svg>
                </button>
              </div>
              
              <div class="overflow-hidden">
                <div 
                  class="flex transition-transform duration-500 ease-in-out"
                  [style.transform]="'translateX(-' + currentSlide * 100 + '%)'"
                >
                  <div *ngFor="let post of featuredPosts" class="w-full flex-shrink-0 px-4">
                    <div class="bg-white dark:bg-gray-700 rounded-xl shadow-lg overflow-hidden">
                      <div class="md:flex">
                        <div class="md:w-1/3">
                          <img 
                            [src]="post.thumbnail" 
                            [alt]="post.title"
                            class="h-48 md:h-full w-full object-cover"
                          >
                        </div>
                        <div class="p-8 md:w-2/3">
                          <div class="uppercase tracking-wide text-sm text-primary-600 dark:text-primary-400 font-semibold">
                            Featured
                          </div>
                          <a 
                            [routerLink]="['/blog', post.id]" 
                            class="block mt-1 text-2xl font-semibold text-gray-900 dark:text-white hover:underline"
                          >
                            {{ post.title }}
                          </a>
                          <p class="mt-2 text-gray-600 dark:text-gray-300">
                            {{ post.excerpt }}
                          </p>
                          <div class="mt-4">
                            <a 
                              [routerLink]="['/blog', post.id]" 
                              class="inline-flex items-center text-primary-600 dark:text-primary-400 hover:underline"
                            >
                              Read more
                              <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                              </svg>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="absolute top-1/2 right-0 transform -translate-y-1/2 z-10">
                <button 
                  (click)="nextSlide()"
                  class="p-2 rounded-full bg-white dark:bg-gray-700 shadow-lg text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600 focus:outline-none"
                >
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                  </svg>
                </button>
              </div>
              
              <!-- Carousel Indicators -->
              <div class="flex justify-center mt-8">
                <div *ngFor="let post of featuredPosts; let i = index" class="mx-1">
                  <button 
                    (click)="goToSlide(i)"
                    class="w-3 h-3 rounded-full focus:outline-none"
                    [ngClass]="currentSlide === i ? 'bg-primary-600 dark:bg-primary-400' : 'bg-gray-300 dark:bg-gray-600'"
                  ></button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Featured Blogs Section -->
        <section class="py-16 bg-white dark:bg-gray-900">
          <div class="container mx-auto px-4">
            <div class="max-w-3xl mx-auto text-center mb-12">
              <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Latest Blog Posts
              </h2>
              <p class="text-gray-600 dark:text-gray-300">
                Dive deeper into the tech world with our in-depth analysis and insights
              </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div *ngFor="let post of featuredPosts" class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                <a [routerLink]="['/blog', post.id]" class="block">
                  <img [src]="post.thumbnail" [alt]="post.title" class="w-full h-48 object-cover">
                  <div class="p-6">
                    <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {{ post.title }}
                    </h3>
                    <p class="text-gray-600 dark:text-gray-300 mb-4">
                      {{ post.excerpt }}
                    </p>
                    <div class="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <span>{{ post.date | date }}</span>
                    </div>
                  </div>
                </a>
              </div>
            </div>

            <div class="text-center">
              <a [routerLink]="['/blog']" 
                 class="inline-flex items-center px-6 py-3 rounded-lg border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white dark:border-primary-400 dark:text-primary-400 dark:hover:bg-primary-400 dark:hover:text-gray-900 transition-colors">
                View All Blogs
              </a>
            </div>
          </div>
        </section>

        <!-- Why DevInsights Section -->
        <section class="py-16 bg-white dark:bg-gray-800">
          <div class="container mx-auto px-4">
            <div class="max-w-3xl mx-auto text-center mb-12">
              <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Why Choose DevInsights?
              </h2>
              <p class="text-gray-600 dark:text-gray-300">
                We combine AI-powered curation with human expertise to bring you the most relevant and insightful tech content
              </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div class="text-center p-6">
                <div class="w-16 h-16 mx-auto mb-4 text-primary-600 dark:text-primary-400">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                  </svg>
                </div>
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Smart Curation
                </h3>
                <p class="text-gray-600 dark:text-gray-300">
                  Our AI analyzes thousands of tech products to bring you the most innovative and impactful solutions
                </p>
              </div>

              <div class="text-center p-6">
                <div class="w-16 h-16 mx-auto mb-4 text-primary-600 dark:text-primary-400">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                  </svg>
                </div>
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  In-depth Analysis
                </h3>
                <p class="text-gray-600 dark:text-gray-300">
                  Get detailed insights and practical applications of the latest tech trends
                </p>
              </div>

              <div class="text-center p-6">
                <div class="w-16 h-16 mx-auto mb-4 text-primary-600 dark:text-primary-400">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                          d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                </div>
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Real-time Updates
                </h3>
                <p class="text-gray-600 dark:text-gray-300">
                  Stay updated with daily curated content from the tech industry's latest innovations
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

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
  `]
})
export class HomeComponent implements OnInit {
  featuredPosts: any[] = [];
  loading = false;
  error: string | null = null;
  currentSlide = 0;

  constructor(private productHuntService: ProductHuntService) {}

  ngOnInit(): void {
    this.loadFeaturedPosts();
  }

  loadFeaturedPosts(): void {
    this.loading = true;
    this.error = null;

    this.productHuntService.getTodayPosts().pipe(
      map(response => {
        // Get only first 3 posts
        return response.data.posts.edges.slice(0, 3).map((edge: any) => ({
          id: edge.node.id,
          title: edge.node.name,
          excerpt: edge.node.tagline,
          thumbnail: edge.node.media[0]?.url || '/assets/images/placeholder.png',
          date: new Date()
        }));
      }),
      catchError(err => {
        console.error('Error loading featured posts:', err);
        this.error = 'Failed to load featured posts. Please try again.';
        return of([]);
      })
    ).subscribe(posts => {
      this.featuredPosts = posts;
      this.loading = false;
    });
  }

  prevSlide(): void {
    this.currentSlide = this.currentSlide === 0 ? this.featuredPosts.length - 1 : this.currentSlide - 1;
  }

  nextSlide(): void {
    this.currentSlide = this.currentSlide === this.featuredPosts.length - 1 ? 0 : this.currentSlide + 1;
  }

  goToSlide(index: number): void {
    this.currentSlide = index;
  }
}