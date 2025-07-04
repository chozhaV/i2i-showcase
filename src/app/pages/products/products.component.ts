import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { Product, ProductCategory } from '../../models/product.model';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductCardComponent],
  template: `
    <div class="pt-24 pb-12">
      <div class="container mx-auto px-4">
        <!-- Header -->
        <div class="text-center mb-16">
          <h1 class="section-title">Our Products</h1>
          <p class="section-subtitle">
            Discover our comprehensive range of smart technology solutions designed to meet your business needs
          </p>
        </div>

        <!-- Filters -->
        <div class="mb-12">
          <div class="flex flex-wrap gap-4 justify-center">
            <button 
              class="filter-btn"
              [class.active]="selectedCategory === 'all'"
              (click)="filterProducts('all')">
              All Products
            </button>
            <button 
              *ngFor="let category of categories"
              class="filter-btn"
              [class.active]="selectedCategory === category.id"
              (click)="filterProducts(category.id)">
              {{ category.name }}
            </button>
          </div>
        </div>

        <!-- Search -->
        <div class="mb-12 max-w-md mx-auto">
          <div class="relative">
            <input 
              type="text"
              [(ngModel)]="searchTerm"
              (input)="searchProducts()"
              placeholder="Search products..."
              class="input-field pl-12">
            <svg class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-dark-400" 
                 fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
          </div>
        </div>

        <!-- Products Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <app-product-card 
            *ngFor="let product of filteredProducts; let i = index"
            [product]="product"
            [style.--animation-order]="i"
            class="stagger-animation animate-on-scroll">
          </app-product-card>
        </div>

        <!-- No Results -->
        <div *ngIf="filteredProducts.length === 0" class="text-center py-12">
          <div class="text-6xl mb-4">🔍</div>
          <h3 class="text-2xl font-semibold text-white mb-2">No products found</h3>
          <p class="text-dark-400 mb-6">Try adjusting your search or filter criteria</p>
          <button class="btn-primary" (click)="clearFilters()">
            Clear Filters
          </button>
        </div>

        <!-- Load More -->
        <div *ngIf="filteredProducts.length > 0 && hasMore" class="text-center">
          <button 
            class="btn-secondary px-8 py-4"
            (click)="loadMore()"
            [disabled]="loading">
            <span *ngIf="!loading">Load More Products</span>
            <span *ngIf="loading" class="flex items-center">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Loading...
            </span>
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .filter-btn {
      @apply px-4 py-2 rounded-lg font-medium transition-all duration-300 border border-dark-600 text-dark-300 hover:text-white hover:border-primary-500;
    }
    
    .filter-btn.active {
      @apply bg-primary-500 text-white border-primary-500;
    }
  `]
})
export class ProductsComponent implements OnInit, OnDestroy, AfterViewInit {
  private destroy$ = new Subject<void>();
  
  categories: ProductCategory[] = [];
  allProducts: Product[] = [];
  filteredProducts: Product[] = [];
  selectedCategory = 'all';
  searchTerm = '';
  loading = false;
  hasMore = false;
  displayCount = 9;

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
        this.allProducts = products;
        this.filteredProducts = products.slice(0, this.displayCount);
        this.hasMore = products.length > this.displayCount;
      });
  }

  ngAfterViewInit(): void {
    this.setupScrollAnimations();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  filterProducts(category: string): void {
    this.selectedCategory = category;
    this.displayCount = 9;
    this.applyFilters();
  }

  searchProducts(): void {
    this.displayCount = 9;
    this.applyFilters();
  }

  private applyFilters(): void {
    let filtered = this.allProducts;

    // Apply category filter
    if (this.selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === this.selectedCategory);
    }

    // Apply search filter
    if (this.searchTerm.trim()) {
      const searchLower = this.searchTerm.toLowerCase();
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower) ||
        product.sku.toLowerCase().includes(searchLower) ||
        product.features.some(feature => feature.toLowerCase().includes(searchLower))
      );
    }

    this.filteredProducts = filtered.slice(0, this.displayCount);
    this.hasMore = filtered.length > this.displayCount;
  }

  loadMore(): void {
    this.loading = true;
    setTimeout(() => {
      this.displayCount += 6;
      this.applyFilters();
      this.loading = false;
    }, 1000);
  }

  clearFilters(): void {
    this.selectedCategory = 'all';
    this.searchTerm = '';
    this.displayCount = 9;
    this.applyFilters();
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