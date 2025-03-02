import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://api.producthunt.com/v2/api/graphql';
  private apiToken = 'YOUR_PRODUCT_HUNT_API_TOKEN';

  // Mock data for development
  private mockProducts: Product[] = [
    // {
    //   id: '1',
    //   name: 'Notion AI',
    //   tagline: 'AI writing assistant built into Notion',
    //   description: 'Notion AI is a writing assistant that helps you write, edit, summarize, and brainstorm. ' +
    //                'It\'s built directly into Notion, so you can use it anywhere you\'re already writing.',
    //   thumbnail: 'https://ph-files.imgix.net/d1a35e06-ec86-4a7c-b0f0-b12684ce53c6.png',
    //   votesCount: 1245,
    //   commentsCount: 87,
    //   url: 'https://notion.ai',
    //   category: 'Productivity',
    //   createdAt: new Date().toISOString(),
    //   media: [
    //     'https://ph-files.imgix.net/d1a35e06-ec86-4a7c-b0f0-b12684ce53c6.png',
    //     'https://ph-files.imgix.net/b2e2e70d-b9b9-4c9c-a3cb-ef9dc3caed25.png'
    //   ]
    // },
    // {
    //   id: '2',
    //   name: 'ChatGPT',
    //   tagline: "OpenAI's new chatbot that can hold a conversation",
    //   description: 'ChatGPT is a sibling model to InstructGPT, which is trained to follow an instruction in a prompt ' +
    //                'and provide a detailed response',
    //   thumbnail: 'https://ph-files.imgix.net/3b8c2978-a233-4d41-a5d5-b116f07d9fd9.png',
    //   votesCount: 3782,
    //   commentsCount: 245,
    //   url: 'https://chat.openai.com',
    //   category: 'Artificial Intelligence',
    //   createdAt: new Date().toISOString(),
    //   media: [
    //     'https://ph-files.imgix.net/3b8c2978-a233-4d41-a5d5-b116f07d9fd9.png',
    //     'https://ph-files.imgix.net/a9cd3dd9-9553-4523-b325-e5559d4eb015.png'
    //   ]
    // },
    // {
    //   id: '3',
    //   name: 'Midjourney',
    //   tagline: 'AI text-to-image generator',
    //   description: 'Midjourney is an AI art generator that creates images from text descriptions, called prompts, that users input.',
    //   thumbnail: 'https://ph-files.imgix.net/ec8385c5-9342-4c28-8a9d-81156b4f7cd7.png',
    //   votesCount: 2541,
    //   commentsCount: 178,
    //   url: 'https://midjourney.com',
    //   category: 'Design Tools',
    //   createdAt: new Date().toISOString(),
    //   media: [
    //     'https://ph-files.imgix.net/ec8385c5-9342-4c28-8a9d-81156b4f7cd7.png',
    //     'https://ph-files.imgix.net/d5b72fde-6d3b-4c6d-8b4d-8b9c4f8d6317.png'
    //   ]
    // }
  ];

  constructor(private http: HttpClient) {}

  getTrendingProducts(): Observable<Product[]> {
    // For development, return mock data
    return of(this.mockProducts);

    // When ready to connect to the real API:
    /*
    const query = `
      query {
        posts(first: 20, order: RANKING) {
          edges {
            node {
              id
              name
              tagline
              description
              url
              votesCount
              commentsCount
              thumbnail {
                url
              }
              topics {
                edges {
                  node {
                    name
                  }
                }
              }
              createdAt
              media {
                url
                type
              }
            }
          }
        }
      }
    `;

    return this.http.post(this.apiUrl, { query }, {
      headers: {
        'Authorization': `Bearer ${this.apiToken}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).pipe(
      map((response: any) => {
        return response.data.posts.edges.map(edge => {
          const node = edge.node;
          return {
            id: node.id,
            name: node.name,
            tagline: node.tagline,
            description: node.description,
            thumbnail: node.thumbnail.url,
            votesCount: node.votesCount,
            commentsCount: node.commentsCount,
            url: node.url,
            category: node.topics.edges.length > 0 ? node.topics.edges[0].node.name : 'Uncategorized',
            createdAt: node.createdAt,
            media: node.media.map(m => m.url)
          };
        });
      }),
      catchError(error => {
        console.error('Error fetching products:', error);
        return of([]);
      })
    );
    */
  }

  getProductById(id: string): Observable<Product | null> {
    // For development, return mock data
    const product = this.mockProducts.find(p => p.id === id);
    return of(product || null);

    // When ready to connect to the real API:
    /*
    const query = `
      query {
        post(id: "${id}") {
          id
          name
          tagline
          description
          url
          votesCount
          commentsCount
          thumbnail {
            url
          }
          topics {
            edges {
              node {
                name
              }
            }
          }
          createdAt
          media {
            url
            type
          }
        }
      }
    `;

    return this.http.post(this.apiUrl, { query }, {
      headers: {
        'Authorization': `Bearer ${this.apiToken}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).pipe(
      map((response: any) => {
        const node = response.data.post;
        if (!node) return null;
        
        return {
          id: node.id,
          name: node.name,
          tagline: node.tagline,
          description: node.description,
          thumbnail: node.thumbnail.url,
          votesCount: node.votesCount,
          commentsCount: node.commentsCount,
          url: node.url,
          category: node.topics.edges.length > 0 ? node.topics.edges[0].node.name : 'Uncategorized',
          createdAt: node.createdAt,
          media: node.media.map(m => m.url)
        };
      }),
      catchError(error => {
        console.error('Error fetching product:', error);
        return of(null);
      })
    );
    */
  }

  searchProducts(query: string): Observable<Product[]> {
    // For development, filter mock data
    return of(this.mockProducts.filter(p => 
      p.name.toLowerCase().includes(query.toLowerCase()) || 
      p.tagline.toLowerCase().includes(query.toLowerCase()) ||
      p.description.toLowerCase().includes(query.toLowerCase())
    ));
  }

  getProductsByCategory(category: string): Observable<Product[]> {
    // For development, filter mock data
    return of(this.mockProducts.filter(p => p.category === category));
  }
}