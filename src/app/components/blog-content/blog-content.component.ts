import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { marked } from 'marked';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-blog-content',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="blog-content" [innerHTML]="sanitizedContent">
    </div>
  `,
  styles: [`
    .blog-content {
      max-width: 800px;
      margin: 0 auto;
      font-family: 'Inter', system-ui, -apple-system, sans-serif;
      line-height: 1.6;
      color: #1a1a1a;
    }

    :host ::ng-deep {
      h1 {
        font-size: 2.5rem;
        font-weight: 700;
        margin-bottom: 1.5rem;
        color: #1a1a1a;
        line-height: 1.2;
      }

      h2 {
        font-size: 1.8rem;
        font-weight: 600;
        margin-top: 2rem;
        margin-bottom: 1rem;
        color: #2d2d2d;
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }

      h3 {
        font-size: 1.4rem;
        font-weight: 600;
        margin-top: 1.5rem;
        margin-bottom: 0.75rem;
        color: #2d2d2d;
      }

      p {
        margin-bottom: 1.2rem;
        color: #333;
        font-size: 1.1rem;
      }

      ul, ol {
        margin-bottom: 1.2rem;
        padding-left: 1.5rem;
        color: #333;
      }

      li {
        margin-bottom: 0.5rem;
        color: #333;
      }

      blockquote {
        border-left: 4px solid #3b82f6;
        padding: 1rem 1.5rem;
        margin: 1.5rem 0;
        background-color: #f8fafc;
        border-radius: 0.5rem;
        font-style: italic;
        color: #4b5563;
      }

      code {
        background-color: #f1f5f9;
        padding: 0.2rem 0.4rem;
        border-radius: 0.25rem;
        font-family: 'Fira Code', monospace;
        font-size: 0.9em;
        color: #333;
      }

      pre {
        background-color: #1e293b;
        padding: 1rem;
        border-radius: 0.5rem;
        overflow-x: auto;
        margin: 1.5rem 0;

        code {
          background-color: transparent;
          color: #e2e8f0;
          padding: 0;
        }
      }

      img {
        max-width: 100%;
        height: auto;
        border-radius: 0.5rem;
        margin: 1.5rem 0;
      }

      a {
        color: #3b82f6;
        text-decoration: none;
        transition: color 0.2s;

        &:hover {
          color: #2563eb;
          text-decoration: underline;
        }
      }

      hr {
        margin: 2rem 0;
        border: 0;
        border-top: 1px solid #e5e7eb;
      }

      .emoji {
        display: inline-block;
        font-size: 1.5em;
        line-height: 1;
        vertical-align: middle;
        margin: 0 0.2em;
      }

      strong, b {
        font-weight: 600;
        color: #111827;
      }

      em, i {
        font-style: italic;
      }

      table {
        width: 100%;
        border-collapse: collapse;
        margin: 1.5rem 0;
        
        th, td {
          border: 1px solid #e5e7eb;
          padding: 0.75rem;
          text-align: left;
        }
        
        th {
          background-color: #f8fafc;
          font-weight: 600;
        }
        
        tr:nth-child(even) {
          background-color: #f9fafb;
        }
      }
    }

    @media (prefers-color-scheme: dark) {
      .blog-content {
        color: #e5e5e5;
      }

      :host ::ng-deep {
        h1, h2, h3 {
          color: #e5e5e5;
        }

        p, li {
          color: #d1d1d1;
        }

        blockquote {
          background-color: #2d2d2d;
          color: #d1d1d1;
        }

        code {
          background-color: #2d2d2d;
          color: #e2e8f0;
        }

        a {
          color: #60a5fa;

          &:hover {
            color: #93c5fd;
          }
        }

        strong, b {
          color: #f3f4f6;
        }

        table {
          th, td {
            border-color: #374151;
          }
          
          th {
            background-color: #1f2937;
          }
          
          tr:nth-child(even) {
            background-color: #111827;
          }
        }
      }
    }
  `]
})
export class BlogContentComponent implements OnChanges {
  @Input() content: string = '';
  sanitizedContent: SafeHtml = '';

  constructor(private sanitizer: DomSanitizer) {
    // Use minimal options to avoid linter errors
    marked.setOptions({
      gfm: true,        // GitHub Flavored Markdown
      breaks: true      // Add <br> on single line breaks
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['content']) {
      try {
        // Process the content if it exists
        if (this.content) {
          console.log('Processing markdown content');
          
          // Convert markdown to HTML
          const htmlContent = marked.parse(this.content || '');
          
          if (typeof htmlContent === 'string') {
            // Process emojis in headings
            const processedContent = this.processEmojisInHeadings(htmlContent);
            
            // Sanitize and set the content
            this.sanitizedContent = this.sanitizer.bypassSecurityTrustHtml(processedContent);
            console.log('Markdown processed successfully');
          } else {
            console.error('Marked returned non-string content');
            this.sanitizedContent = this.sanitizer.bypassSecurityTrustHtml('<p>Error processing content</p>');
          }
        } else {
          console.warn('Empty content provided to BlogContentComponent');
          this.sanitizedContent = this.sanitizer.bypassSecurityTrustHtml('<p>No content available</p>');
        }
      } catch (error) {
        console.error('Error processing markdown:', error);
        this.sanitizedContent = this.sanitizer.bypassSecurityTrustHtml('<p>Error processing content</p>');
      }
    }
  }

  /**
   * Process emojis in headings to add proper styling
   */
  private processEmojisInHeadings(html: string): string {
    // Regular expression to find headings with emojis
    // This matches h1-h6 tags and looks for emoji characters at the beginning of the content
    return html.replace(
      /(<h[1-6][^>]*>)([\u{1F300}-\u{1F9FF}|\u{2600}-\u{26FF}|\u{2700}-\u{27BF}|\u{1F100}-\u{1F1FF}|\u{1F200}-\u{1F2FF}|\u{1F600}-\u{1F64F}|\u{1F680}-\u{1F6FF}|\u{1F900}-\u{1F9FF}|\u{2B50}|\u{2B06}|\u{2934}|\u{2935}])\s*([^<]*<\/h[1-6]>)/gu,
      (match, openTag, emoji, rest) => {
        return `${openTag}<span class="emoji">${emoji}</span> ${rest}`;
      }
    );
  }
} 