import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';

export interface VideoContent {
  id: string;
  title: string;
  videoUrl?: string;
  thumbnailUrl: string;
  script?: string;
  youtubeUrl?: string;
  instagramUrl?: string;
}

@Injectable({
  providedIn: 'root'
})
export class VideoGenerationService {
  constructor() {}

  generateVideoContent(product: any): Observable<VideoContent | null> {
    console.log('Generating video content for product:', product);
    
    // Check if the product has media
    if (!product.media || product.media.length === 0) {
      console.log('No media found for product');
      return of(null);
    }
    
    // Find a video in the product media if available
    const videoMedia = product.media.find((media: any) => media.type === 'video');
    
    if (videoMedia && videoMedia.url) {
      console.log('Found video media in product:', videoMedia);
      
      // Create a YouTube embed URL if it's a YouTube video
      let videoUrl = videoMedia.url;
      let youtubeUrl = videoMedia.url;
      
      // Check if it's a YouTube URL and convert to embed format if needed
      if (videoUrl.includes('youtube.com/watch') || videoUrl.includes('youtu.be')) {
        // Extract video ID
        let videoId = '';
        
        if (videoUrl.includes('youtube.com/watch')) {
          const urlParams = new URLSearchParams(videoUrl.split('?')[1]);
          videoId = urlParams.get('v') || '';
        } else if (videoUrl.includes('youtu.be')) {
          videoId = videoUrl.split('/').pop() || '';
        }
        
        if (videoId) {
          videoUrl = `https://www.youtube.com/embed/${videoId}`;
        }
      }
      
      // Generate a script based on the product
      const script = this.generateScript(product);
      
      return of({
        id: product.id,
        title: product.name,
        videoUrl: videoUrl,
        thumbnailUrl: videoMedia.url,
        script,
        youtubeUrl: youtubeUrl,
        instagramUrl: undefined
      });
    } else {
      console.log('No video found in product media, returning null');
      return of(null);
    }
  }

  private generateScript(product: any): string {
    return `This video showcases ${product.name}: ${product.tagline}. \n\n${product.description || ''}`;
  }
} 