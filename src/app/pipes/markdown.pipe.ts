import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { marked } from 'marked';

@Pipe({
  name: 'markdown',
  standalone: true
})
export class MarkdownPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {
    marked.setOptions({
      async: false
    });
  }

  transform(value: string | undefined | null): SafeHtml {
    if (!value) return this.sanitizer.bypassSecurityTrustHtml('');
    
    const html = marked.parse(value);
    return this.sanitizer.bypassSecurityTrustHtml(html as string);
  }
} 