import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Firestore, collection, addDoc, updateDoc, deleteDoc, doc, getDocs, getDoc, query, where, orderBy } from '@angular/fire/firestore';
import { BlogPost } from '../models/blog.model';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private mockBlogPosts: BlogPost[] = [
    {
      id: '1',
      title: 'Notion AI: Revolutionizing Productivity',
      content: '# Notion AI: Revolutionizing Productivity\n\nNotion AI is changing how we work with its powerful AI assistant...',
      productId: '1',
      thumbnail: 'https://ph-files.imgix.net/d1a35e06-ec86-4a7c-b0f0-b12684ce53c6.png',
      excerpt: 'Notion AI is changing how we work with its powerful AI assistant...',
      author: 'AI Assistant',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      views: 245,
      likes: 42
    },
    {
      id: '2',
      title: 'ChatGPT: The Future of Conversational AI',
      content: '# ChatGPT: The Future of Conversational AI\n\nChatGPT is revolutionizing how we interact with AI...',
      productId: '2',
      thumbnail: 'https://ph-files.imgix.net/3b8c2978-a233-4d41-a5d5-b116f07d9fd9.png',
      excerpt: 'ChatGPT is revolutionizing how we interact with AI...',
      author: 'AI Assistant',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      views: 567,
      likes: 123
    },
    {
      id: '3',
      title: 'Midjourney: AI Art Generation Explained',
      content: '# Midjourney: AI Art Generation Explained\n\nMidjourney is changing the landscape of digital art creation...',
      productId: '3',
      thumbnail: 'https://ph-files.imgix.net/ec8385c5-9342-4c28-8a9d-81156b4f7cd7.png',
      excerpt: 'Midjourney is changing the landscape of digital art creation...',
      author: 'AI Assistant',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      views: 389,
      likes: 87
    }
  ];

  constructor(private firestore: Firestore) {}

  getBlogPosts(): Observable<BlogPost[]> {
    // For development, return mock data
    return of(this.mockBlogPosts);

    // When ready to connect to Firebase:
    /*
    const blogCollection = collection(this.firestore, 'blogs');
    const blogQuery = query(blogCollection, orderBy('createdAt', 'desc'));
    
    return new Observable<BlogPost[]>(observer => {
      getDocs(blogQuery)
        .then(snapshot => {
          const blogs = snapshot.docs.map(doc => {
            const data = doc.data();
            return {
              id: doc.id,
              title: data['title'],
              content: data['content'],
              productId: data['productId'],
              thumbnail: data['thumbnail'],
              excerpt: data['excerpt'],
              author: data['author'],
              createdAt: data['createdAt'],
              updatedAt: data['updatedAt'],
              views: data['views'] || 0,
              likes: data['likes'] || 0
            } as BlogPost;
          });
          observer.next(blogs);
          observer.complete();
        })
        .catch(error => {
          console.error('Error fetching blog posts:', error);
          observer.error(error);
        });
    });
    */
  }

  getBlogPostById(id: string): Observable<BlogPost | null> {
    // For development, return mock data
    const post = this.mockBlogPosts.find(p => p.id === id);
    return of(post || null);

    // When ready to connect to Firebase:
    /*
    const docRef = doc(this.firestore, 'blogs', id);
    
    return new Observable<BlogPost | null>(observer => {
      getDoc(docRef)
        .then(docSnap => {
          if (docSnap.exists()) {
            const data = docSnap.data();
            const blog = {
              id: docSnap.id,
              title: data['title'],
              content: data['content'],
              productId: data['productId'],
              thumbnail: data['thumbnail'],
              excerpt: data['excerpt'],
              author: data['author'],
              createdAt: data['createdAt'],
              updatedAt: data['updatedAt'],
              views: data['views'] || 0,
              likes: data['likes'] || 0
            } as BlogPost;
            
            // Increment view count
            updateDoc(docRef, { views: (data['views'] || 0) + 1 });
            
            observer.next(blog);
          } else {
            observer.next(null);
          }
          observer.complete();
        })
        .catch(error => {
          console.error('Error fetching blog post:', error);
          observer.error(error);
        });
    });
    */
  }

  getBlogPostsByProductId(productId: string): Observable<BlogPost[]> {
    // For development, filter mock data
    return of(this.mockBlogPosts.filter(p => p.productId === productId));

    // When ready to connect to Firebase:
    /*
    const blogCollection = collection(this.firestore, 'blogs');
    const blogQuery = query(blogCollection, where('productId', '==', productId));
    
    return new Observable<BlogPost[]>(observer => {
      getDocs(blogQuery)
        .then(snapshot => {
          const blogs = snapshot.docs.map(doc => {
            const data = doc.data();
            return {
              id: doc.id,
              title: data['title'],
              content: data['content'],
              productId: data['productId'],
              thumbnail: data['thumbnail'],
              excerpt: data['excerpt'],
              author: data['author'],
              createdAt: data['createdAt'],
              updatedAt: data['updatedAt'],
              views: data['views'] || 0,
              likes: data['likes'] || 0
            } as BlogPost;
          });
          observer.next(blogs);
          observer.complete();
        })
        .catch(error => {
          console.error('Error fetching blog posts by product:', error);
          observer.error(error);
        });
    });
    */
  }

  createBlogPost(blog: Omit<BlogPost, 'id'>): Observable<string> {
    // For development, add to mock data
    const newId = (this.mockBlogPosts.length + 1).toString();
    const newBlog = { ...blog, id: newId };
    this.mockBlogPosts.push(newBlog);
    return of(newId);

    // When ready to connect to Firebase:
    /*
    const blogCollection = collection(this.firestore, 'blogs');
    
    return new Observable<string>(observer => {
      addDoc(blogCollection, {
        ...blog,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        views: 0,
        likes: 0
      })
        .then(docRef => {
          observer.next(docRef.id);
          observer.complete();
        })
        .catch(error => {
          console.error('Error creating blog post:', error);
          observer.error(error);
        });
    });
    */
  }

  updateBlogPost(id: string, blog: Partial<BlogPost>): Observable<boolean> {
    // For development, update mock data
    const index = this.mockBlogPosts.findIndex(p => p.id === id);
    if (index !== -1) {
      this.mockBlogPosts[index] = { ...this.mockBlogPosts[index], ...blog, updatedAt: new Date().toISOString() };
      return of(true);
    }
    return of(false);

    // When ready to connect to Firebase:
    /*
    const docRef = doc(this.firestore, 'blogs', id);
    
    return new Observable<boolean>(observer => {
      updateDoc(docRef, {
        ...blog,
        updatedAt: new Date().toISOString()
      })
        .then(() => {
          observer.next(true);
          observer.complete();
        })
        .catch(error => {
          console.error('Error updating blog post:', error);
          observer.error(error);
        });
    });
    */
  }

  deleteBlogPost(id: string): Observable<boolean> {
    // For development, remove from mock data
    const index = this.mockBlogPosts.findIndex(p => p.id === id);
    if (index !== -1) {
      this.mockBlogPosts.splice(index, 1);
      return of(true);
    }
    return of(false);

    // When ready to connect to Firebase:
    /*
    const docRef = doc(this.firestore, 'blogs', id);
    
    return new Observable<boolean>(observer => {
      deleteDoc(docRef)
        .then(() => {
          observer.next(true);
          observer.complete();
        })
        .catch(error => {
          console.error('Error deleting blog post:', error);
          observer.error(error);
        });
    });
    */
  }

  likeBlogPost(id: string): Observable<boolean> {
    // For development, update mock data
    const index = this.mockBlogPosts.findIndex(p => p.id === id);
    if (index !== -1) {
      this.mockBlogPosts[index].likes += 1;
      return of(true);
    }
    return of(false);

    // When ready to connect to Firebase:
    /*
    const docRef = doc(this.firestore, 'blogs', id);
    
    return new Observable<boolean>(observer => {
      getDoc(docRef)
        .then(docSnap => {
          if (docSnap.exists()) {
            const data = docSnap.data();
            updateDoc(docRef, { likes: (data['likes'] || 0) + 1 })
              .then(() => {
                observer.next(true);
                observer.complete();
              })
              .catch(error => {
                console.error('Error liking blog post:', error);
                observer.error(error);
              });
          } else {
            observer.next(false);
            observer.complete();
          }
        })
        .catch(error => {
          console.error('Error fetching blog post for like:', error);
          observer.error(error);
        });
    });
    */
  }
}