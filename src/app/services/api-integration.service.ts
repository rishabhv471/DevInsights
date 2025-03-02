import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiIntegrationService {
  private mistralApiUrl = 'https://api.mistral.ai/v1/chat/completions';
  private productHuntApiUrl = 'https://api.producthunt.com/v2/api/graphql';
  
  // These would normally be stored securely in environment variables
  private mistralApiKey = 'your-mistral-api-key';
  private productHuntApiKey = 'your-product-hunt-api-key';

  constructor(private http: HttpClient) {}

  /**
   * Generate content using Mistral AI API
   * @param prompt The prompt to send to Mistral AI
   * @returns Observable with the generated content
   */
  generateContent(prompt: string): Observable<string> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.mistralApiKey}`
    });

    const body = {
      model: 'mistral-large-latest',
      messages: [
        { role: 'user', content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 1000
    };

    return this.http.post(this.mistralApiUrl, body, { headers }).pipe(
      map((response: any) => {
        return response.choices[0].message.content;
      }),
      catchError(this.handleError<string>('generateContent', 'Failed to generate content'))
    );
  }

  /**
   * Fetch top products from Product Hunt API
   * @param limit Number of products to fetch
   * @returns Observable with the product data
   */
  getTopProducts(limit: number = 5): Observable<any[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.productHuntApiKey}`
    });

    const query = `
      query {
        posts(first: ${limit}) {
          edges {
            node {
              id
              name
              tagline
              description
              url
              votesCount
              thumbnail {
                url
              }
              website
            }
          }
        }
      }
    `;

    return this.http.post(this.productHuntApiUrl, { query }, { headers }).pipe(
      map((response: any) => {
        return response.data.posts.edges.map((edge: any) => edge.node);
      }),
      catchError(this.handleError<any[]>('getTopProducts', []))
    );
  }

  /**
   * Handle HTTP operation that failed
   * @param operation Name of the operation that failed
   * @param result Optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      
      // Let the app keep running by returning an empty result
      return of(result as T);
    };
  }
} 