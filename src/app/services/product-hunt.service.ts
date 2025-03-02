import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { map, catchError, tap, delay } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductHuntService {
  private readonly API_URL = 'https://api.producthunt.com/v2/api/graphql';
  
  // Mock data for when the API fails
  private mockPostsResponse = {
    data: {
      posts: {
        edges: [
          {
            node: {
              id: 'mock-1',
              name: 'AI-Powered Content Creation',
              tagline: 'Create high-quality content with the help of advanced AI models',
              description: 'An AI tool that helps you create content for your blog, social media, and more.',
              url: 'https://www.producthunt.com',
              votesCount: 120,
              media: [
                {
                  url: '/assets/images/placeholder.png',
                  type: 'image'
                }
              ],
              topics: {
                edges: [
                  { node: { name: 'AI' } },
                  { node: { name: 'Content Creation' } },
                  { node: { name: 'Productivity' } }
                ]
              },
              user: {
                name: 'AI Team'
              },
              slug: 'ai-content-creation'
            }
          },
          {
            node: {
              id: 'mock-2',
              name: 'Smart Task Management',
              tagline: 'Organize your tasks with intelligent prioritization',
              description: 'A task management tool that uses AI to help you prioritize your tasks.',
              url: 'https://www.producthunt.com',
              votesCount: 95,
              media: [
                {
                  url: '/assets/images/placeholder.png',
                  type: 'image'
                }
              ],
              topics: {
                edges: [
                  { node: { name: 'Productivity' } },
                  { node: { name: 'Task Management' } },
                  { node: { name: 'AI' } }
                ]
              },
              user: {
                name: 'Productivity Team'
              },
              slug: 'smart-task-management'
            }
          },
          {
            node: {
              id: 'mock-3',
              name: 'Video Generation Platform',
              tagline: 'Create professional videos with just a few clicks',
              description: 'An AI-powered video generation platform that helps you create professional videos.',
              url: 'https://www.producthunt.com',
              votesCount: 150,
              media: [
                {
                  url: '/assets/images/placeholder.png',
                  type: 'image'
                }
              ],
              topics: {
                edges: [
                  { node: { name: 'Video' } },
                  { node: { name: 'AI' } },
                  { node: { name: 'Content Creation' } }
                ]
              },
              user: {
                name: 'Video Team'
              },
              slug: 'video-generation-platform'
            }
          }
        ]
      }
    }
  };
  
  private mockPostResponse = {
    data: {
      post: {
        id: 'mock-1',
        name: 'AI-Powered Content Creation',
        tagline: 'Create high-quality content with the help of advanced AI models',
        description: 'An AI tool that helps you create content for your blog, social media, and more.',
        url: 'https://www.producthunt.com',
        votesCount: 120,
        media: [
          {
            url: '/assets/images/placeholder.png',
            type: 'image'
          }
        ],
        topics: {
          edges: [
            { node: { name: 'AI' } },
            { node: { name: 'Content Creation' } },
            { node: { name: 'Productivity' } }
          ]
        },
        user: {
          name: 'AI Team'
        },
        slug: 'ai-content-creation'
      }
    }
  };

  constructor(private http: HttpClient) {}

  getTodayPosts(): Observable<any> {
    const query = `
      query {
        posts(first: 20) {
          edges {
            node {
              id
              name
              tagline
              description
              url
              votesCount
              media {
                url
                type
              }
              topics {
                edges {
                  node {
                    name
                  }
                }
              }
              user {
                name
              }
              slug
            }
          }
        }
      }
    `;

    console.log('Fetching posts from ProductHunt API with token:', environment.productHuntToken ? 'Token exists' : 'No token');
    
    // Use the real API
    const useMockData = false; // Set to true to use mock data
    
    if (useMockData) {
      console.log('Using mock data for ProductHunt posts');
      return of(this.mockPostsResponse).pipe(
        delay(500) // Simulate network delay
      );
    }
    
    return this.http.post(this.API_URL, { query }, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${environment.productHuntToken}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    }).pipe(
      tap(response => console.log('ProductHunt API response:', response)),
      catchError(error => {
        console.error('Error fetching posts, using mock data instead:', error);
        return of(this.mockPostsResponse);
      })
    );
  }

  getPost(id: string): Observable<any> {
    const query = `
      query {
        post(id: "${id}") {
          id
          name
          tagline
          description
          url
          votesCount
          media {
            url
            type
          }
          topics {
            edges {
              node {
                name
              }
            }
          }
          user {
            name
          }
          slug
        }
      }
    `;

    console.log(`Fetching post with ID ${id} from ProductHunt API`);
    
    // Use the real API
    const useMockData = false; // Set to true to use mock data
    
    if (useMockData) {
      console.log('Using mock data for ProductHunt post');
      // Customize the mock post ID to match the requested ID
      const mockPost = JSON.parse(JSON.stringify(this.mockPostResponse));
      mockPost.data.post.id = id;
      return of(mockPost.data.post).pipe(
        delay(500) // Simulate network delay
      );
    }
    
    return this.http.post(this.API_URL, { query }, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${environment.productHuntToken}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    }).pipe(
      map((response: any) => response.data.post),
      tap(post => console.log(`Retrieved post:`, post)),
      catchError(error => {
        console.error('Error fetching post, using mock data instead:', error);
        // Customize the mock post ID to match the requested ID
        const mockPost = JSON.parse(JSON.stringify(this.mockPostResponse));
        mockPost.data.post.id = id;
        return of(mockPost.data.post);
      })
    );
  }
  
  private handleError(error: HttpErrorResponse) {
    console.error('ProductHunt API Error:', error);
    
    let errorMessage = 'An unknown error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Client Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Server Error: ${error.status} - ${error.statusText || ''} - ${JSON.stringify(error.error)}`;
    }
    
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
} 