import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of, Subscription, throwError } from 'rxjs';
import { catchError, map, switchMap, tap, finalize, shareReplay } from 'rxjs/operators';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { VideoGenerationService, VideoContent } from '../../services/video-generation.service';
import { ProductHuntService } from '../../services/product-hunt.service';
import { DeepseekService } from '../../services/deepseek.service';
import { BlogContentComponent } from '../../components/blog-content/blog-content.component';
import { ImageCarouselComponent } from '../../components/image-carousel/image-carousel.component';

interface BlogPost {
  title: string;
  content: string;
  excerpt: string;
  topics: string[];
  date: string;
  votesCount: number;
  productUrl: string;
  media: Array<{
    type: 'image' | 'video';
    url: string;
    videoUrl?: string;
  }>;
}

interface TopicEdge {
  node: {
    name: string;
  };
}

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
    BlogContentComponent,
    ImageCarouselComponent
  ],
  template: `
    <div class="flex flex-col min-h-screen">
      <app-header></app-header>

      <main class="flex-grow bg-gray-50 dark:bg-gray-900">
        <div class="container mx-auto px-4 py-12">
          <!-- Debug Info -->
          <div *ngIf="loading" class="text-sm text-gray-600 dark:text-gray-400 mb-4">
            <p>Post ID: {{ currentPostId }}</p>
            <p>Loading State: {{ loading }}</p>
            <p>Error: {{ error || 'None' }}</p>
          </div>

          <!-- Loading State -->
          <div *ngIf="loading" class="flex justify-center items-center py-12">
            <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
          </div>

          <!-- Error State -->
          <div *ngIf="error" class="text-center py-12">
            <p class="text-red-600 dark:text-red-400">{{ error }}</p>
            <button
              (click)="loadContent()"
              class="mt-4 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              Try Again
            </button>
          </div>

          <ng-container *ngIf="combinedData$ | async as data">
            <article class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <!-- Product Media Section -->
              <div class="p-6">
                <h1 class="text-3xl font-bold mb-4 text-gray-900 dark:text-white">{{ data.blog?.title }}</h1>
                <p class="text-lg text-gray-600 dark:text-gray-300 mb-6">{{ data.blog?.excerpt }}</p>
                
                <!-- Image Carousel -->
                <div class="mb-8">
                  <app-image-carousel 
                    [media]="getCombinedMedia(data.blog?.media, data.video)"
                    [title]="data.blog?.title || ''"
                    [autoRotate]="true"
                    [rotationInterval]="4000"
                    class="w-full">
                  </app-image-carousel>
                </div>

                <!-- Blog Content -->
                <app-blog-content [content]="data.blog?.content || ''"></app-blog-content>
              </div>
            </article>
          </ng-container>
        </div>
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

    :host ::ng-deep .prose {
      max-width: none;
    }

    .aspect-w-16 {
      position: relative;
      padding-bottom: 56.25%;
    }

    .aspect-w-16 > * {
      position: absolute;
      height: 100%;
      width: 100%;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }
  `]
})
export class BlogDetailComponent implements OnInit, OnDestroy {
  loading = true;
  error: string | null = null;
  currentPostId: string | null = null;
  private subscription: Subscription = new Subscription();
  combinedData$: Observable<{ blog: BlogPost | null; video: VideoContent | null }> = new Observable();

  // Fallback content for when API calls fail
  private fallbackBlog: BlogPost = {
    title: 'AI-Powered Content Creation',
    content: `
      <h1>AI-Powered Content Creation</h1>
      <p>Artificial intelligence is revolutionizing how we create content. From writing assistance to image generation, AI tools are making it easier than ever to produce high-quality content at scale.</p>
      <h2>Key Benefits</h2>
      <ul>
        <li>Increased productivity and efficiency</li>
        <li>Consistent quality across all content</li>
        <li>Ability to scale content production</li>
        <li>Reduced costs compared to traditional methods</li>
      </ul>
      <h2>Popular AI Content Tools</h2>
      <p>There are many AI tools available for content creation, each with its own strengths and use cases. Some of the most popular include:</p>
      <ul>
        <li>ChatGPT for text generation</li>
        <li>Midjourney for image creation</li>
        <li>Runway for video production</li>
        <li>Descript for audio editing</li>
      </ul>
      <h2>The Future of AI Content</h2>
      <p>As AI technology continues to advance, we can expect even more powerful and specialized content creation tools. The future will likely bring more personalized content, better integration with existing workflows, and more natural outputs that are indistinguishable from human-created content.</p>
    `,
    excerpt: 'Discover how AI is transforming content creation across industries',
    topics: ['AI', 'Content Creation', 'Productivity'],
    date: new Date().toISOString(),
    votesCount: 120,
    productUrl: 'https://www.producthunt.com',
    media: [
      {
        type: 'image' as 'image' | 'video',
        url: '/assets/images/placeholder.png'
      },
      {
        type: 'image' as 'image' | 'video',
        url: '/assets/images/hero-illustration.png'
      },
      {
        type: 'image' as 'image' | 'video',
        url: '/assets/images/placeholder.png'
      },
      {
        type: 'video' as 'image' | 'video',
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
      }
    ]
  };
  
  private fallbackVideo: VideoContent = {
    id: 'fallback-video',
    title: 'AI-Powered Content Creation Demo',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnailUrl: '/assets/images/placeholder.png',
    script: 'This demo showcases how AI can be used to generate various types of content, from text to images and videos. The technology behind this is based on large language models and diffusion models that have been trained on vast amounts of data.',
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    instagramUrl: undefined
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productHuntService: ProductHuntService,
    private deepseekService: DeepseekService,
    private videoService: VideoGenerationService
  ) {}

  ngOnInit(): void {
    console.log('BlogDetailComponent initialized');
    
    this.subscription.add(
      this.route.params.pipe(
        tap(params => {
          console.log('Route params:', params);
          this.currentPostId = params['id'];
          this.loading = true;
          this.error = null;
        }),
        switchMap(params => {
          const postId = params['id'];
          console.log('Fetching post with ID:', postId);
          
          // Get the blog post data
          const blog$ = this.productHuntService.getPost(postId).pipe(
            tap(post => console.log('Product Hunt post received:', post)),
            switchMap(post => {
              const blogData = {
                title: post.name,
                excerpt: post.tagline,
                topics: post.topics?.edges?.map((edge: TopicEdge) => edge.node.name) || []
              };
              console.log('Generating blog content with data:', blogData);
              
              return this.deepseekService.generateBlogContent(blogData).pipe(
                tap(response => console.log('Blog content generated:', response)),
                map(response => {
                  const blogPost: BlogPost = {
                    title: post.name,
                    content: response.choices[0].message.content,
                    excerpt: post.tagline,
                    topics: post.topics?.edges?.map((edge: TopicEdge) => edge.node.name) || [],
                    date: new Date().toISOString(),
                    votesCount: post.votesCount,
                    productUrl: post.url,
                    media: post.media?.map((m: any) => ({
                      type: (m.type === 'image' || m.type === 'video') ? m.type : 'image',
                      url: m.url,
                      videoUrl: m.type === 'video' ? m.url : undefined
                    })) || []
                  };
                  return blogPost;
                })
              );
            }),
            catchError(error => {
              console.error('Blog generation error:', error);
              this.error = 'Failed to generate blog content. Using fallback content.';
              return of(this.fallbackBlog);
            })
          );

          // Get the video content
          const video$ = this.productHuntService.getPost(postId).pipe(
            tap(post => console.log('Fetching video content for post:', post.name)),
            switchMap(post => this.videoService.generateVideoContent(post)),
            tap(video => console.log('Video content generated:', video)),
            catchError(error => {
              console.error('Video generation error:', error);
              return of(this.fallbackVideo);
            })
          );

          return this.combineData(blog$, video$);
        })
      ).subscribe({
        next: data => {
          console.log('Combined data received:', data);
          this.combinedData$ = of(data);
          this.loading = false;
        },
        error: error => {
          console.error('Subscription error:', error);
          this.error = 'Failed to load content. Using fallback content.';
          this.loading = false;
          
          // Set fallback data on error with proper typing
          const fallbackData: { blog: BlogPost | null; video: VideoContent | null } = {
            blog: this.fallbackBlog,
            video: this.fallbackVideo
          };
          this.combinedData$ = of(fallbackData);
        }
      })
    );
  }

  private combineData(blog$: Observable<BlogPost | null>, video$: Observable<VideoContent | null>): Observable<{ blog: BlogPost | null; video: VideoContent | null }> {
    return new Observable(observer => {
      let blog: BlogPost | null = null;
      let video: VideoContent | null = null;
      let blogComplete = false;
      let videoComplete = false;

      const checkComplete = () => {
        if (blogComplete && videoComplete) {
          observer.next({ blog, video });
          observer.complete();
        }
      };

      blog$.subscribe({
        next: value => {
          console.log('Blog stream value:', value);
          blog = value;
        },
        error: error => {
          console.error('Blog stream error:', error);
          blogComplete = true;
          checkComplete();
        },
        complete: () => {
          console.log('Blog stream complete');
          blogComplete = true;
          checkComplete();
        }
      });

      video$.subscribe({
        next: value => {
          console.log('Video stream value:', value);
          video = value;
        },
        error: error => {
          console.error('Video stream error:', error);
          videoComplete = true;
          checkComplete();
        },
        complete: () => {
          console.log('Video stream complete');
          videoComplete = true;
          checkComplete();
        }
      });
    });
  }

  ngOnDestroy(): void {
    console.log('BlogDetailComponent destroyed');
    this.subscription.unsubscribe();
  }

  loadContent(): void {
    console.log('BlogDetailComponent initialized');
    
    this.subscription.add(
      this.route.params.pipe(
        tap(params => {
          console.log('Route params:', params);
          this.currentPostId = params['id'];
          this.loading = true;
          this.error = null;
        }),
        switchMap(params => {
          const postId = params['id'];
          console.log('Fetching post with ID:', postId);
          
          // Get the blog post data
          const blog$ = this.productHuntService.getPost(postId).pipe(
            tap(post => console.log('Product Hunt post received:', post)),
            switchMap(post => {
              const blogData = {
                title: post.name,
                excerpt: post.tagline,
                topics: post.topics?.edges?.map((edge: TopicEdge) => edge.node.name) || []
              };
              console.log('Generating blog content with data:', blogData);
              
              return this.deepseekService.generateBlogContent(blogData).pipe(
                tap(response => console.log('Blog content generated:', response)),
                map(response => {
                  const blogPost: BlogPost = {
                    title: post.name,
                    content: response.choices[0].message.content,
                    excerpt: post.tagline,
                    topics: post.topics?.edges?.map((edge: TopicEdge) => edge.node.name) || [],
                    date: new Date().toISOString(),
                    votesCount: post.votesCount,
                    productUrl: post.url,
                    media: post.media?.map((m: any) => ({
                      type: (m.type === 'image' || m.type === 'video') ? m.type : 'image',
                      url: m.url,
                      videoUrl: m.type === 'video' ? m.url : undefined
                    })) || []
                  };
                  return blogPost;
                })
              );
            }),
            catchError(error => {
              console.error('Blog generation error:', error);
              this.error = 'Failed to generate blog content. Using fallback content.';
              return of(this.fallbackBlog);
            })
          );

          // Get the video content
          const video$ = this.productHuntService.getPost(postId).pipe(
            tap(post => console.log('Fetching video content for post:', post.name)),
            switchMap(post => this.videoService.generateVideoContent(post)),
            tap(video => console.log('Video content generated:', video)),
            catchError(error => {
              console.error('Video generation error:', error);
              return of(this.fallbackVideo);
            })
          );

          return this.combineData(blog$, video$);
        })
      ).subscribe({
        next: data => {
          console.log('Combined data received:', data);
          this.combinedData$ = of(data);
          this.loading = false;
        },
        error: error => {
          console.error('Subscription error:', error);
          this.error = 'Failed to load content. Using fallback content.';
          this.loading = false;
          
          // Set fallback data on error with proper typing
          const fallbackData: { blog: BlogPost | null; video: VideoContent | null } = {
            blog: this.fallbackBlog,
            video: this.fallbackVideo
          };
          this.combinedData$ = of(fallbackData);
        }
      })
    );
  }

  // Helper method to combine blog media with video content
  getCombinedMedia(blogMedia: Array<{type: 'image' | 'video', url: string, videoUrl?: string}> = [], 
                   videoContent: VideoContent | null = null): Array<{type: 'image' | 'video', url: string, videoUrl?: string}> {
    let combinedMedia = [...(blogMedia || [])];
    
    // Add video content to the media array if it exists and has a videoUrl
    if (videoContent && videoContent.videoUrl) {
      // Check if the video is already in the media array
      const videoExists = combinedMedia.some(media => 
        media.type === 'video' && 
        (media.videoUrl === videoContent.videoUrl || media.url === videoContent.youtubeUrl)
      );
      
      if (!videoExists) {
        combinedMedia.push({
          type: 'video',
          url: videoContent.thumbnailUrl || '/assets/images/placeholder.png',
          videoUrl: videoContent.videoUrl
        });
      }
    }
    
    // If there are no media items, add a default image
    if (combinedMedia.length === 0) {
      combinedMedia.push({
        type: 'image',
        url: '/assets/images/placeholder.png'
      });
    }
    
    return combinedMedia;
  }
}