import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { Product, ProductCategory } from '../../models/product.model';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, ProductCardComponent],
  template: `
    <!-- Hero Section -->
    <section class="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900"></div>
      <div class="absolute inset-0 bg-gradient-to-r from-primary-500/10 via-transparent to-secondary-500/10"></div>
      
      <div class="relative z-10 container mx-auto px-4 text-center">
        <div class="max-w-4xl mx-auto space-y-8 animate-fade-in">
          <h1 class="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
            <span class="bg-gradient-to-r from-primary-400 via-secondary-400 to-accent-400 bg-clip-text text-transparent">
              Smart Technology
            </span>
            <br>
            <span class="text-white">Solutions</span>
          </h1>
          
          <p class="text-xl md:text-2xl text-dark-300 max-w-2xl mx-auto leading-relaxed">
            Leading provider of advanced technology solutions across education, security, and smart infrastructure domains
          </p>
          
          <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button class="btn-primary text-lg px-8 py-4" routerLink="/products">
              Explore Products
            </button>
            <button class="btn-secondary text-lg px-8 py-4" routerLink="/contact">
              Get Started
            </button>
          </div>
        </div>
        
        <!-- Floating Elements -->
        <div class="absolute top-20 left-10 w-20 h-20 bg-primary-500/20 rounded-full blur-xl animate-pulse"></div>
        <div class="absolute bottom-20 right-10 w-32 h-32 bg-secondary-500/20 rounded-full blur-xl animate-pulse animation-delay-1000"></div>
        <div class="absolute top-1/2 left-1/4 w-16 h-16 bg-accent-500/20 rounded-full blur-xl animate-pulse animation-delay-2000"></div>
      </div>
      
      <!-- Scroll Indicator -->
      <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg class="w-6 h-6 text-dark-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
        </svg>
      </div>
    </section>

    <!-- Categories Section -->
    <section class="py-20 bg-dark-800/50">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="section-title">Our Solutions</h2>
          <p class="section-subtitle">
            Comprehensive technology solutions tailored to your industry needs
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div 
            *ngFor="let category of categories; let i = index"
            class="card text-center hover:border-primary-500/50 animate-on-scroll"
            [style.--animation-order]="i">
            <div class="text-4xl mb-4">{{ category.icon }}</div>
            <h3 class="text-xl font-semibold text-white mb-2">{{ category.name }}</h3>
            <p class="text-dark-400 text-sm mb-4">{{ category.description }}</p>
            <button 
              class="text-primary-400 hover:text-primary-300 font-medium text-sm transition-colors duration-300"
              (click)="filterByCategory(category.id)">
              View Products →
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Products Section -->
    <section class="py-20">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="section-title">Featured Products</h2>
          <p class="section-subtitle">
            Discover our most popular and innovative technology solutions
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <app-product-card 
            *ngFor="let product of featuredProducts; let i = index"
            [product]="product"
            [style.--animation-order]="i"
            class="stagger-animation">
          </app-product-card>
        </div>
        
        <div class="text-center mt-12">
          <button class="btn-primary text-lg px-8 py-4" routerLink="/products">
            View All Products
          </button>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="py-20 bg-dark-800/50">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div class="text-center animate-on-scroll">
            <div class="text-3xl md:text-4xl font-bold text-primary-400 mb-2">500+</div>
            <div class="text-dark-400">Projects Completed</div>
          </div>
          <div class="text-center animate-on-scroll">
            <div class="text-3xl md:text-4xl font-bold text-secondary-400 mb-2">100+</div>
            <div class="text-dark-400">Happy Clients</div>
          </div>
          <div class="text-center animate-on-scroll">
            <div class="text-3xl md:text-4xl font-bold text-accent-400 mb-2">24/7</div>
            <div class="text-dark-400">Support</div>
          </div>
          <div class="text-center animate-on-scroll">
            <div class="text-3xl md:text-4xl font-bold text-warning-400 mb-2">5+</div>
            <div class="text-dark-400">Years Experience</div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20">
      <div class="container mx-auto px-4">
        <div class="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-8 md:p-12 text-center">
          <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Business?
          </h2>
          <p class="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Get in touch with our experts to discuss your technology needs and discover how we can help you achieve your goals.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <button class="bg-white text-primary-600 hover:bg-primary-50 font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105" routerLink="/contact">
              Contact Us Today
            </button>
            <button class="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold py-3 px-8 rounded-lg transition-all duration-300" routerLink="/products">
              Browse Products
            </button>
          </div>
        </div>
      </div>
    </section>
  `
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {
  private destroy$ = new Subject<void>();
  
  categories: ProductCategory[] = [];
  featuredProducts: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.categories$
      .pipe(takeUntil(this.destroy$))
      .subscribe(categories => {
        this.categories = categories;
      });

    this.productService.products$
      .pipe(takeUntil(this.destroy$))
      .subscribe(products => {
        this.featuredProducts = products.slice(0, 6);
      });
  }

  ngAfterViewInit(): void {
    this.setupScrollAnimations();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  filterByCategory(categoryId: string): void {
    // Navigate to products page with category filter
    // This would be implemented with router navigation
    console.log('Filter by category:', categoryId);
  }

  private setupScrollAnimations(): void {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => observer.observe(el));
  }
}