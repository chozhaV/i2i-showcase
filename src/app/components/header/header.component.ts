import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
            [class.bg-dark-900]="isScrolled"
            [class.backdrop-blur-sm]="isScrolled"
            [class.shadow-lg]="isScrolled">
      <nav class="container mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          <!-- Logo -->
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-lg">i2i</span>
            </div>
            <div>
              <h1 class="text-xl font-bold text-white">i2i Smart Enterprises</h1>
              <p class="text-xs text-dark-400">Smart Technology Solutions</p>
            </div>
          </div>

          <!-- Desktop Navigation -->
          <div class="hidden md:flex items-center space-x-8">
            <a routerLink="/" 
               routerLinkActive="text-primary-400"
               [routerLinkActiveOptions]="{exact: true}"
               class="nav-link">
              Home
            </a>
            <a routerLink="/products" 
               routerLinkActive="text-primary-400"
               class="nav-link">
              Products
            </a>
            <a routerLink="/about" 
               routerLinkActive="text-primary-400"
               class="nav-link">
              About Us
            </a>
            <a routerLink="/contact" 
               routerLinkActive="text-primary-400"
               class="nav-link">
              Contact
            </a>
            <button class="btn-primary">
              Get Quote
            </button>
          </div>

          <!-- Mobile Menu Button -->
          <button 
            class="md:hidden text-white focus:outline-none"
            (click)="toggleMobileMenu()">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                    [attr.d]="mobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'" />
            </svg>
          </button>
        </div>

        <!-- Mobile Navigation -->
        <div class="md:hidden transition-all duration-300 overflow-hidden"
             [class.max-h-0]="!mobileMenuOpen"
             [class.max-h-96]="mobileMenuOpen">
          <div class="pt-4 pb-2 space-y-2">
            <a routerLink="/" 
               routerLinkActive="text-primary-400"
               [routerLinkActiveOptions]="{exact: true}"
               class="mobile-nav-link"
               (click)="closeMobileMenu()">
              Home
            </a>
            <a routerLink="/products" 
               routerLinkActive="text-primary-400"
               class="mobile-nav-link"
               (click)="closeMobileMenu()">
              Products
            </a>
            <a routerLink="/about" 
               routerLinkActive="text-primary-400"
               class="mobile-nav-link"
               (click)="closeMobileMenu()">
              About Us
            </a>
            <a routerLink="/contact" 
               routerLinkActive="text-primary-400"
               class="mobile-nav-link"
               (click)="closeMobileMenu()">
              Contact
            </a>
            <div class="pt-2">
              <button class="btn-primary w-full" (click)="closeMobileMenu()">
                Get Quote
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  `,
  styles: [`
    .nav-link {
      @apply text-dark-300 hover:text-white transition-colors duration-300 font-medium;
    }
    
    .mobile-nav-link {
      @apply block py-2 px-4 text-dark-300 hover:text-white hover:bg-dark-800 rounded-lg transition-all duration-300;
    }
  `]
})
export class HeaderComponent {
  isScrolled = false;
  mobileMenuOpen = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.pageYOffset > 10;
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMobileMenu() {
    this.mobileMenuOpen = false;
  }
}