import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="min-h-screen bg-gray-100 flex items-center justify-center">
      <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 class="text-2xl font-bold mb-6 text-center">Login</h2>
        <form (ngSubmit)="onSubmit()" #loginForm="ngForm">
          <div class="mb-4">
            <label for="email" class="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              [(ngModel)]="email"
              class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
          </div>
          <div class="mb-6">
            <label for="password" class="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              [(ngModel)]="password"
              class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
          </div>
          <button
            type="submit"
            class="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
            [disabled]="!loginForm.form.valid"
          >
            Login
          </button>
        </form>
        <div class="mt-4 text-center text-gray-600">
          <p>For testing, use:</p>
          <p>Email: admin&#64;example.com</p>
          <p>Password: password</p>
        </div>
      </div>
    </div>
  `
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    this.authService.login(this.email, this.password).subscribe(success => {
      if (success) {
        this.router.navigate(['/']);
      } else {
        // Handle login error
        console.error('Login failed');
      }
    });
  }
}