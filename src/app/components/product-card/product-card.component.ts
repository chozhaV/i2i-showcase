import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card group hover:border-primary-500/50 animate-on-scroll">
      <div class="relative overflow-hidden rounded-lg mb-4">
        <img 
          [src]="product.image" 
          [alt]="product.name"
          class="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy">
        <div class="absolute inset-0 bg-gradient-to-t from-dark-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div class="absolute top-4 right-4">
          <span class="bg-primary-500/90 text-white text-xs px-2 py-1 rounded-full">
            {{ product.sku }}
          </span>
        </div>
      </div>
      
      <div class="space-y-3">
        <h3 class="text-xl font-semibold text-white group-hover:text-primary-400 transition-colors duration-300">
          {{ product.name }}
        </h3>
        
        <p class="text-dark-400 text-sm line-clamp-2">
          {{ product.description }}
        </p>
        
        <div class="flex flex-wrap gap-2">
          <span 
            *ngFor="let feature of product.features.slice(0, 3)"
            class="text-xs bg-dark-700 text-dark-300 px-2 py-1 rounded">
            {{ feature }}
          </span>
          <span 
            *ngIf="product.features.length > 3"
            class="text-xs bg-primary-500/20 text-primary-400 px-2 py-1 rounded">
            +{{ product.features.length - 3 }} more
          </span>
        </div>
        
        <div class="flex justify-between items-center pt-2">
          <button class="text-primary-400 hover:text-primary-300 font-medium text-sm transition-colors duration-300">
            Learn More →
          </button>
          <button class="btn-primary !py-2 !px-4 !text-sm">
            Get Quote
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .line-clamp-2 {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  `]
})
export class ProductCardComponent {
  @Input() product!: Product;
}