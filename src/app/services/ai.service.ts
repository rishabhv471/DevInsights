import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class AIService {
  constructor() {}

  // In a real application, this would call an AI service API
  generateBlogPost(product: Product): Observable<string> {
    // Mock AI-generated blog post
    const blogPost = `
# ${product.name}: Revolutionizing ${product.category}

## Introduction
${product.name} has been making waves in the ${product.category} space with its innovative approach to solving common problems. With ${product.votesCount} upvotes on Product Hunt, it's clear that users are finding value in this tool.

## What is ${product.name}?
${product.tagline}. ${product.description}

## Key Features
- Feature 1: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
- Feature 2: Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
- Feature 3: Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.

## How ${product.name} Compares to Alternatives
When compared to similar products in the market, ${product.name} stands out for its user-friendly interface and powerful capabilities. While competitors may offer similar features, ${product.name}'s unique approach provides a more streamlined experience.

## Use Cases
1. **Use Case 1**: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
2. **Use Case 2**: Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
3. **Use Case 3**: Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.

## Conclusion
${product.name} is a promising tool that addresses key pain points in the ${product.category} space. With its innovative features and user-friendly design, it's worth considering for anyone looking to improve their workflow.

## Learn More
Visit [${product.name}](${product.url}) to learn more and try it out for yourself.
`;
    return of(blogPost);
  }

  generateYouTubeScript(product: Product): Observable<string> {
    // Mock AI-generated YouTube script
    const script = `
# ${product.name} Review: Everything You Need to Know

## Introduction (0:00-0:30)
Hey everyone! Welcome back to the channel. Today we're diving deep into ${product.name}, a new tool that's been making waves in the ${product.category} space.

## What is ${product.name}? (0:30-1:30)
${product.name} is ${product.tagline}. It was designed to help users [describe main purpose]. With over ${product.votesCount} upvotes on Product Hunt, it's clearly resonating with many users.

## Key Features (1:30-4:00)
Let's break down the main features that make ${product.name} stand out:
1. Feature 1: [Description]
2. Feature 2: [Description]
3. Feature 3: [Description]

## Demo (4:00-7:00)
Now, let me show you how ${product.name} works in practice. [Describe demo steps]

## Pricing (7:00-8:00)
${product.name} offers several pricing tiers to accommodate different needs:
- Free tier: [Description]
- Pro tier: [Description]
- Enterprise tier: [Description]

## Pros and Cons (8:00-10:00)
Pros:
- [List 3-4 pros]

Cons:
- [List 2-3 cons]

## Final Verdict (10:00-11:00)
Overall, ${product.name} is a [final assessment]. I'd give it a [rating] out of 10.

## Outro (11:00-11:30)
That's it for today's review! If you found this helpful, please like and subscribe for more content like this. Drop a comment below if you've tried ${product.name} and let me know your thoughts.

Thanks for watching!
`;
    return of(script);
  }
}