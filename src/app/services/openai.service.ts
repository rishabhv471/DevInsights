import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OpenAIService {
  private apiUrl = 'https://api.openai.com/v1/chat/completions';

  constructor(private http: HttpClient) {}

  generateBlogContent(productData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${environment.openaiApiKey}`
    });

    const prompt = `As an expert tech blogger and product analyst, write an engaging, detailed blog post about this product:

Product Name: ${productData.title}
Tagline: ${productData.excerpt}
Topics: ${productData.topics.join(', ')}

The blog post should be structured as follows:

1. A captivating introduction that hooks the reader
2. Comprehensive overview of key features with real-world applications
3. In-depth technical analysis with industry comparisons
4. Market impact and future potential
5. User experience and practical benefits
6. Expert conclusion with recommendations

Make it informative yet engaging, using:
- Industry insights and expert analysis
- Relevant examples and use cases
- Technical details explained in an accessible way
- Market trends and competitive analysis
- Clear value propositions

Style: Professional but conversational
Length: 800-1000 words
Focus: Technical accuracy, practical value, and engagement`;

    return this.http.post(this.apiUrl, {
      model: 'gpt-4-turbo-preview',
      messages: [{
        role: 'system',
        content: 'You are an expert tech blogger and product analyst with deep industry knowledge.'
      }, {
        role: 'user',
        content: prompt
      }],
      temperature: 0.7,
      max_tokens: 2000
    }, { headers });
  }
} 