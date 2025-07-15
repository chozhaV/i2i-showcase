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
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
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