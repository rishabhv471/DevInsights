import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // For development, mock authentication
  private mockAuthenticated = false;

  constructor() {}

  login(email: string, password: string): Observable<boolean> {
    // For development, mock login
    if (email === 'admin@example.com' && password === 'password') {
      this.mockAuthenticated = true;
      return of(true);
    }
    return of(false);
  }

  register(email: string, password: string): Observable<boolean> {
    // For development, mock registration
    if (email && password) {
      this.mockAuthenticated = true;
      return of(true);
    }
    return of(false);
  }

  logout(): Observable<boolean> {
    // For development, mock logout
    this.mockAuthenticated = false;
    return of(true);
  }

  isAuthenticated(): Observable<boolean> {
    // For development, return mock authentication status
    return of(this.mockAuthenticated);
  }
}