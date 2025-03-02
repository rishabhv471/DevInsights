import { Injectable } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map, catchError, tap } from 'rxjs/operators';

interface BlogPost {
  title: string;
  excerpt: string;
  topics: string[];
}

@Injectable({
  providedIn: 'root'
})
export class DeepseekService {
  // Together AI endpoint
  private apiUrl = 'https://api.together.xyz/v1/chat/completions';
  
  // Fallback blog content in case API fails
  private fallbackContent = `# 🚀 Revolutionizing Tech: A Deep Dive

## ✨ Introduction
Welcome to the cutting edge of technology! In this blog post, we'll explore an innovative solution that's changing the way we interact with digital tools. Whether you're a developer, tech enthusiast, or business professional, you'll find valuable insights about this game-changing product.

## 🎯 Key Features & Benefits
* **Seamless Integration** - Works with your existing tech stack
* **Intuitive Interface** - Minimal learning curve for new users
* **Powerful Performance** - Optimized for speed and efficiency
* **Scalable Architecture** - Grows with your needs

## 💡 Technical Deep Dive
This solution stands out from competitors through its unique approach to solving common technical challenges. The architecture is built on modern principles that prioritize both performance and maintainability.

\`\`\`
// Example implementation
const solution = new TechSolution({
  optimization: true,
  securityLevel: 'enterprise'
});

solution.deploy();
\`\`\`

> "The most impressive aspect is how it balances complexity with usability - something rarely achieved in this space."

## 👥 Target Audience & Use Cases
### Who benefits most?
* Development teams looking to streamline workflows
* Businesses seeking competitive technological advantages
* Individual creators needing powerful yet accessible tools

### Real-world applications:
1. Automating repetitive development tasks
2. Enhancing customer-facing digital experiences
3. Optimizing internal business processes

## 📈 Market Impact & Future Potential
Currently positioned as a rising star in the market, this solution addresses gaps that established players have overlooked. The roadmap includes exciting developments in AI integration, expanded platform support, and enhanced collaboration features.

## ⭐ Expert Recommendations
**Pros:**
* Outstanding performance metrics
* Excellent documentation and support
* Regular feature updates

**Cons:**
* Premium pricing may be prohibitive for small teams
* Some advanced features require technical expertise

**Verdict:** Highly recommended for organizations serious about leveraging technology for competitive advantage. The initial investment pays dividends through improved efficiency and capabilities.`;

  constructor(private http: HttpClient) {}

  generateBlogContent(productData: BlogPost): Observable<any> {
    console.log('Starting blog generation for:', productData);

    // Check if API key is available
    if (!environment.togetherApiKey) {
      console.warn('No API key found, using fallback content');
      return of({
        choices: [{
          message: {
            content: this.getFallbackBlogContent(productData)
          }
        }]
      });
    }

    const prompt = `As a tech enthusiast and product expert, create an engaging, modern blog post about this product. Use emojis strategically and markdown formatting to make it visually appealing and easy to read.

Product: ${productData.title}
Description: ${productData.excerpt}
Topics: ${productData.topics.join(', ')}

Structure your blog post with these sections (use proper markdown headings):

# 🚀 [Engaging Title about ${productData.title}]

## ✨ Introduction
- Hook the reader with an exciting opener
- Highlight key innovation points

## 🎯 Key Features & Benefits
- Use bullet points for clarity
- Highlight real-world applications
- Include practical examples

## 💡 Technical Deep Dive
- Compare with similar solutions
- Highlight unique technical advantages
- Use code snippets or technical examples if relevant

## 👥 Target Audience & Use Cases
- Who benefits most?
- Real-world scenarios
- Success stories or potential applications

## 📈 Market Impact & Future Potential
- Current market position
- Growth opportunities
- Future developments

## ⭐ Expert Recommendations
- Clear verdict
- Pros and cons
- Who should get this?

Style Requirements:
- Use markdown formatting (##, -, *, >, etc.)
- Include relevant emojis for section headers and key points
- Break up text with bullet points and subheadings
- Use bold and italic for emphasis
- Add blockquotes for important insights
- Keep paragraphs short and scannable
- Maintain a conversational yet professional tone

Length: Approximately 800-1000 words
Format: Use proper markdown syntax throughout`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${environment.togetherApiKey}`
    });

    console.log('Using API key:', environment.togetherApiKey.substring(0, 10) + '...');

    const payload = {
      model: 'mistralai/Mixtral-8x7B-Instruct-v0.1',
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.75,
      max_tokens: 2000
    };

    return this.http.post(this.apiUrl, payload, { headers }).pipe(
      tap(response => {
        console.log('API Response received:', response);
      }),
      map((response: any) => {
        if (!response?.choices?.[0]?.message?.content) {
          console.error('Invalid API response format:', response);
          throw new Error('Invalid response format from API');
        }
        return {
          choices: [{
            message: {
              content: response.choices[0].message.content
            }
          }]
        };
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('API Error:', error);
        
        // Return fallback content instead of throwing an error
        console.log('Using fallback blog content due to API error');
        return of({
          choices: [{
            message: {
              content: this.getFallbackBlogContent(productData)
            }
          }]
        });
      })
    );
  }

  private getFallbackBlogContent(productData: BlogPost): string {
    // Create a customized version of the fallback content
    return this.fallbackContent.replace('Revolutionizing Tech: A Deep Dive', 
      `${productData.title}: A Deep Dive`).replace('Welcome to the cutting edge of technology!', 
      `Welcome to ${productData.title}! ${productData.excerpt}`);
  }
} 