import { Injectable } from '@angular/core';
import { Observable, from, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { GoogleGenerativeAI } from '@google/generative-ai';

interface BlogPost {
  title: string;
  excerpt: string;
  topics: string[];
}

@Injectable({
  providedIn: 'root'
})
export class GeminiService {
  private genAI: GoogleGenerativeAI;

  constructor() {
    console.log('Initializing Gemini service with API key:', environment.geminiApiKey);
    this.genAI = new GoogleGenerativeAI(environment.geminiApiKey);
  }

  generateBlogContent(productData: BlogPost): Observable<any> {
    const prompt = `
      Write a detailed blog post about this product:
      Name: ${productData.title}
      Tagline: ${productData.excerpt}
      Topics: ${productData.topics.join(', ')}
      
      Please include:
      1. An engaging introduction
      2. Key features and benefits
      3. Use cases and applications
      4. Technical analysis (if applicable)
      5. Market impact and potential
      6. Conclusion
      
      Make it informative, engaging, and optimized for SEO.
      Target length: 800-1000 words.
    `;

    return from(this.generateContent(prompt)).pipe(
      catchError(error => {
        console.error('Error in generateBlogContent:', error);
        if (error.message?.includes('API key not valid')) {
          return throwError(() => new Error('Invalid API key. Please check your configuration.'));
        }
        return throwError(() => error);
      })
    );
  }

  private async generateContent(prompt: string) {
    try {
      console.log('Generating content with prompt:', prompt);
      const model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      console.log('Generated content:', text.substring(0, 100) + '...');
      return {
        candidates: [{
          content: {
            parts: [{
              text
            }]
          }
        }]
      };
    } catch (error) {
      console.error('Error in generateContent:', error);
      throw error;
    }
  }
} 