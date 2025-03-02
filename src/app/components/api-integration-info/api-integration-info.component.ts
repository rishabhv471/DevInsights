import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-api-integration-info',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="w-full overflow-hidden">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">API Integrations</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Mistral AI Integration -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-blue-500">
          <div class="flex items-center mb-4">
            <svg class="w-8 h-8 text-blue-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Mistral AI Integration</h3>
          </div>
          
          <p class="text-gray-700 dark:text-gray-300 mb-4">
            Our application leverages the power of Mistral AI to generate high-quality content for blog posts and product descriptions. 
            The integration works as follows:
          </p>
          
          <ul class="list-disc pl-5 text-gray-700 dark:text-gray-300 space-y-2">
            <li>Admin users can request AI-generated content by providing a topic or prompt</li>
            <li>The application sends the prompt to Mistral AI's API</li>
            <li>Mistral AI processes the request and generates relevant content</li>
            <li>The generated content is returned and can be edited before publishing</li>
          </ul>
          
          <div class="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md text-sm text-gray-700 dark:text-gray-300 font-mono">
            POST https://api.mistral.ai/v1/chat/completions
          </div>
        </div>
        
        <!-- Product Hunt Integration -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-amber-500">
          <div class="flex items-center mb-4">
            <svg class="w-8 h-8 text-amber-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Product Hunt Integration</h3>
          </div>
          
          <p class="text-gray-700 dark:text-gray-300 mb-4">
            We integrate with the Product Hunt API to showcase trending tech products on our platform.
            This integration enables us to:
          </p>
          
          <ul class="list-disc pl-5 text-gray-700 dark:text-gray-300 space-y-2">
            <li>Fetch the latest and most popular products from Product Hunt</li>
            <li>Display product details including name, description, and votes</li>
            <li>Link directly to the product pages for more information</li>
            <li>Keep our content fresh with daily updates of trending products</li>
          </ul>
          
          <div class="mt-4 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-md text-sm text-gray-700 dark:text-gray-300 font-mono">
            POST https://api.producthunt.com/v2/api/graphql
          </div>
        </div>
      </div>
      
      <div class="mt-6 p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg text-gray-700 dark:text-gray-300 text-sm">
        <p class="flex items-center">
          <svg class="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Note: API keys are stored securely and all requests are made server-side to protect credentials.
        </p>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class ApiIntegrationInfoComponent {
  constructor() {}
} 