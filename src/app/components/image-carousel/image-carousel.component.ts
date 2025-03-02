import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafePipe } from '../../pipes/safe.pipe';
import { interval, Subscription } from 'rxjs';

interface MediaItem {
  type: 'image' | 'video';
  url: string;
  videoUrl?: string;
}

@Component({
  selector: 'app-image-carousel',
  standalone: true,
  imports: [CommonModule, SafePipe],
  template: `
    <div class="carousel-container relative">
      <!-- Main Image Display -->
      <div class="main-image-container bg-gray-100 dark:bg-gray-700 overflow-hidden rounded-lg">
        <ng-container *ngIf="currentMedia">
          <!-- Image -->
          <img *ngIf="currentMedia.type === 'image'" 
               [src]="currentMedia.url" 
               [alt]="title"
               class="w-full h-full object-contain">
          
          <!-- Video -->
          <iframe *ngIf="currentMedia.type === 'video' && currentMedia.videoUrl"
                  [src]="currentMedia.videoUrl | safe:'resourceUrl'"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                  class="w-full h-full">
          </iframe>
        </ng-container>
      </div>
      
      <!-- Indicators -->
      <div *ngIf="media.length > 1" class="indicators-container flex justify-center space-x-1 mt-1">
        <button *ngFor="let item of media; let i = index"
                (click)="setCurrentIndex(i); pauseAutoRotation()"
                class="w-1.5 h-1.5 rounded-full transition-all"
                [class.bg-primary-500]="i === currentIndex"
                [class.bg-gray-300]="i !== currentIndex"
                [class.dark:bg-gray-300]="i === currentIndex"
                [class.dark:bg-gray-600]="i !== currentIndex">
        </button>
      </div>
      
      <!-- Thumbnails -->
      <div *ngIf="media.length > 1" class="thumbnails-container flex justify-center space-x-1 mt-1 overflow-x-auto pb-1">
        <div *ngFor="let item of media; let i = index"
             (click)="setCurrentIndex(i); pauseAutoRotation()"
             class="thumbnail-item cursor-pointer rounded-sm overflow-hidden"
             [class.border]="i === currentIndex"
             [class.border-primary-500]="i === currentIndex">
          <img [src]="item.url" 
               [alt]="'Thumbnail ' + (i + 1)"
               class="w-8 h-8 object-cover">
        </div>
      </div>
    </div>
  `,
  styles: [`
    .carousel-container {
      width: 100%;
      max-width: 800px;
      margin: 0 auto;
    }
    
    .main-image-container {
      position: relative;
      padding-bottom: 56.25%; /* 16:9 aspect ratio */
      height: 0;
    }
    
    .main-image-container > * {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      object-fit: contain;
    }
    
    .thumbnails-container {
      scrollbar-width: thin;
      scrollbar-color: rgba(156, 163, 175, 0.5) transparent;
    }
    
    .thumbnails-container::-webkit-scrollbar {
      height: 6px;
    }
    
    .thumbnails-container::-webkit-scrollbar-track {
      background: transparent;
    }
    
    .thumbnails-container::-webkit-scrollbar-thumb {
      background-color: rgba(156, 163, 175, 0.5);
      border-radius: 3px;
    }
    
    .thumbnail-item {
      transition: all 0.2s ease-in-out;
    }
    
    .thumbnail-item:hover {
      transform: scale(1.05);
    }
    
    @media (max-width: 640px) {
      .main-image-container {
        padding-bottom: 75%; /* 4:3 aspect ratio for mobile */
      }
    }
  `]
})
export class ImageCarouselComponent implements OnInit, OnDestroy {
  @Input() media: MediaItem[] = [];
  @Input() title: string = '';
  @Input() autoRotate: boolean = true;
  @Input() rotationInterval: number = 4000; // 4 seconds
  
  currentIndex: number = 0;
  currentMedia: MediaItem | null = null;
  autoRotationPaused: boolean = false;
  
  private autoRotationSubscription?: Subscription;
  
  ngOnInit(): void {
    if (this.media && this.media.length > 0) {
      this.currentMedia = this.media[0];
      
      // Start auto-rotation if enabled and there are multiple items
      if (this.autoRotate && this.media.length > 1) {
        this.startAutoRotation();
      }
    }
  }
  
  ngOnDestroy(): void {
    // Clean up subscription when component is destroyed
    this.stopAutoRotation();
  }
  
  nextImage(): void {
    if (this.media.length > 1) {
      this.currentIndex = (this.currentIndex + 1) % this.media.length;
      this.currentMedia = this.media[this.currentIndex];
    }
  }
  
  prevImage(): void {
    if (this.media.length > 1) {
      this.currentIndex = (this.currentIndex - 1 + this.media.length) % this.media.length;
      this.currentMedia = this.media[this.currentIndex];
    }
  }
  
  setCurrentIndex(index: number): void {
    if (index >= 0 && index < this.media.length) {
      this.currentIndex = index;
      this.currentMedia = this.media[this.currentIndex];
    }
  }
  
  startAutoRotation(): void {
    // Stop any existing subscription first
    this.stopAutoRotation();
    
    // Create a new subscription
    this.autoRotationSubscription = interval(this.rotationInterval).subscribe(() => {
      if (!this.autoRotationPaused) {
        this.nextImage();
      }
    });
    
    this.autoRotationPaused = false;
  }
  
  stopAutoRotation(): void {
    if (this.autoRotationSubscription) {
      this.autoRotationSubscription.unsubscribe();
      this.autoRotationSubscription = undefined;
    }
  }
  
  pauseAutoRotation(): void {
    this.autoRotationPaused = true;
  }
  
  resumeAutoRotation(): void {
    this.autoRotationPaused = false;
  }
  
  toggleAutoRotation(): void {
    if (this.autoRotationPaused) {
      this.resumeAutoRotation();
    } else {
      this.pauseAutoRotation();
    }
  }
} 