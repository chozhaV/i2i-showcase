import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  ElementRef,
  ViewChild,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Router } from "@angular/router";
import { ProductService } from "../../services/product.service";
import { Product, ProductCategory } from "../../models/product.model";
import { Subject, takeUntil } from "rxjs";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <!-- Hero Section -->
    <section
      class="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100"
    >
      <div
        class="absolute inset-0 bg-gradient-to-r from-primary-500/10 via-transparent to-secondary-500/10"
      ></div>

      <div class="relative z-10 container mx-auto px-4 text-center">
        <div class="max-w-4xl mx-auto space-y-8 animate-fade-in">
          <h1 class="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
            <span
              class="bg-gradient-to-r from-primary-400 via-secondary-400 to-accent-400 bg-clip-text text-transparent"
            >
              Smart Technology
            </span>
            <br />
            <span class="text-gray-900">Solutions</span>
          </h1>

          <p
            class="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
          >
            Leading provider of advanced technology solutions across education,
            security, and smart infrastructure domains
          </p>

          <div
            class="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button
              class="btn-primary text-lg px-8 py-4"
              (click)="scrollToProducts()"
            >
              Explore Products
            </button>
            <button
              class="btn-secondary text-lg px-8 py-4"
              (click)="navigateToContact()"
            >
              Get Started
            </button>
          </div>
        </div>

        <!-- Floating Elements -->
        <div
          class="absolute top-20 left-10 w-20 h-20 bg-primary-500/20 rounded-full blur-xl animate-pulse"
        ></div>
        <div
          class="absolute bottom-20 right-10 w-32 h-32 bg-secondary-500/20 rounded-full blur-xl animate-pulse animation-delay-1000"
        ></div>
        <div
          class="absolute top-1/2 left-1/4 w-16 h-16 bg-accent-500/20 rounded-full blur-xl animate-pulse animation-delay-2000"
        ></div>
      </div>

      <!-- Scroll Indicator -->
      <div
        class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
        (click)="scrollToProducts()"
      >
        <svg
          class="w-6 h-6 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>

    <!-- Products Section -->
    <section #productsSection class="py-20 bg-white">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="section-title">Our Products</h2>
          <p class="section-subtitle">
            Discover our comprehensive range of smart technology solutions
          </p>
        </div>

        <!-- Product List -->
        <div class="space-y-32">
          <div
            *ngFor="let product of products; let i = index"
            class="product-item"
            [class.reverse]="i % 2 === 1"
            [attr.data-index]="i"
          >
            <div
              class="flex flex-col lg:flex-row items-center gap-12 lg:gap-16"
            >
              <!-- Product Image -->
              <div class="product-image-container lg:w-1/2 relative">
                <div class="relative">
                  <div class="product-image-3d">
                    <img
                      [src]="product.image"
                      [alt]="product.name"
                      class="w-full h-64 sm:h-80 md:h-96 object-cover rounded-2xl shadow-2xl transform transition-all duration-700"
                      loading="lazy"
                    />
                    <div
                      class="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent rounded-2xl"
                    ></div>

                    <!-- Category Badge -->
                    <div class="absolute bottom-4 left-4">
                      <span
                        class="bg-white/90 backdrop-blur-sm text-gray-900 text-sm px-3 py-1 rounded-full font-medium shadow-lg"
                      >
                        {{ getCategoryName(product.category) }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Product Details -->
              <div class="product-details lg:w-1/2 space-y-6">
                <div>
                  <h3 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    {{ product.name }}
                  </h3>
                  <p class="text-lg text-gray-600 leading-relaxed">
                    {{ product.description }}
                  </p>
                </div>

                <!-- Features and Specifications Side by Side on Mobile/Tablet -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6" *ngIf="product.features.length">
                  <!-- Features -->
                  <div class="space-y-3">
                    <h4 class="text-xl font-semibold text-gray-900">
                      Key Features
                    </h4>
                    <div class="space-y-2">
                      <div
                        *ngFor="let feature of product.features"
                        class="flex items-center space-x-2 feature-badge"
                      >
                        <div class="w-2 h-2 bg-primary-500 rounded-full"></div>
                        <span class="text-gray-700 font-medium text-sm">{{
                          feature
                        }}</span>
                      </div>
                    </div>
                  </div>

                  <!-- Specifications -->
                  <div class="space-y-3" *ngIf="product.specifications">
                    <h4 class="text-xl font-semibold text-gray-900">
                      Specifications
                    </h4>
                    <div class="bg-gray-50 rounded-xl p-3 space-y-1">
                      <div
                        *ngFor="
                          let spec of getSpecifications(product.specifications)
                        "
                        class="flex justify-between items-center py-1 border-b border-gray-200 last:border-b-0"
                      >
                        <span class="text-gray-600 font-medium text-sm">{{
                          spec.key
                        }}</span>
                        <span class="text-gray-900 text-sm">{{
                          spec.value
                        }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="py-20 bg-gray-100">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div class="text-center animate-on-scroll">
            <div class="text-3xl md:text-4xl font-bold text-primary-400 mb-2">
              1900+
            </div>
            <div class="text-gray-600">Projects Completed</div>
          </div>
          <div class="text-center animate-on-scroll">
            <div class="text-3xl md:text-4xl font-bold text-secondary-400 mb-2">
              1800+
            </div>
            <div class="text-gray-600">Happy Clients</div>
          </div>
          <div class="text-center animate-on-scroll">
            <div class="text-3xl md:text-4xl font-bold text-accent-400 mb-2">
              24/7
            </div>
            <div class="text-gray-600">Support</div>
          </div>
          <div class="text-center animate-on-scroll">
            <div class="text-3xl md:text-4xl font-bold text-warning-400 mb-2">
              9+
            </div>
            <div class="text-gray-600">Years Experience</div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20">
      <div class="container mx-auto px-4">
        <div
          class="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-8 md:p-12 text-center"
        >
          <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Business?
          </h2>
          <p class="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Get in touch with our experts to discuss your technology needs and
            discover how we can help you achieve your goals.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              class="bg-white text-primary-600 hover:bg-primary-50 font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105"
              routerLink="/contact"
            >
              Contact Us Today
            </button>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .product-item {
        opacity: 0;
        transform: translateY(50px);
        transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      }

      .product-item.animate {
        opacity: 1;
        transform: translateY(0);
      }

      .product-item.reverse .product-image-container {
        order: 2;
      }

      .product-item.reverse .product-details {
        order: 1;
      }

      .product-image-3d {
        position: relative;
        transform: perspective(800px) rotateY(25deg) scale(0.9) rotateX(10deg);
        box-shadow: -16px 50px 32px -8px rgba(0, 0, 0, 0.5);
        transition: transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94),
          box-shadow 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        border-radius: 1rem;
        overflow: hidden;
      }

      .product-image-3d:hover {
        transform: perspective(800px) rotateY(0deg) scale(1) rotateX(0deg);
        box-shadow: 0 16px 32px -8px rgba(0, 0, 0, 0.25),
          0 -16px 32px -8px rgba(0, 0, 0, 0.15),
          16px 0 32px -8px rgba(0, 0, 0, 0.15),
          -16px 0 32px -8px rgba(0, 0, 0, 0.15);
      }

      .product-item.reverse .product-image-3d {
        transform: perspective(800px) rotateY(-25deg) scale(0.9) rotateX(10deg);
        box-shadow: 16px 50px 32px -8px rgba(0, 0, 0, 0.5);
        border-radius: 1rem;
        transition: transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94),
          box-shadow 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        overflow: hidden;
      }

      .product-item.reverse .product-image-3d:hover {
        transform: perspective(800px) rotateY(0deg) scale(1) rotateX(0deg);
        box-shadow: 0 16px 32px -8px rgba(0, 0, 0, 0.25),
          0 -16px 32px -8px rgba(0, 0, 0, 0.15),
          16px 0 32px -8px rgba(0, 0, 0, 0.15),
          -16px 0 32px -8px rgba(0, 0, 0, 0.15);
      }

      .product-image-3d img {
        width: 100%;
        height: 320px;
        object-fit: cover;
        border-radius: 1rem;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25),
          0 0 0 1px rgba(255, 255, 255, 0.1);
        display: block;
      }

      /* Remove transform effects for mobile view */
      @media (max-width: 640px) {
        .product-image-3d,
        .product-item.reverse .product-image-3d {
          transform: none !important;
          transition: none !important;
        }
        .product-image-3d img {
          width: 100%;
          height: 320px; /* Keep same height on mobile */
          object-fit: cover;
          border-radius: 1rem;
          display: block;
        }
      }

      .feature-badge {
        opacity: 0;
        transform: translateX(-20px);
        animation: slideInLeft 0.6s ease forwards;
      }

      .feature-badge:nth-child(1) {
        animation-delay: 0.1s;
      }
      .feature-badge:nth-child(2) {
        animation-delay: 0.2s;
      }
      .feature-badge:nth-child(3) {
        animation-delay: 0.3s;
      }
      .feature-badge:nth-child(4) {
        animation-delay: 0.4s;
      }
      .feature-badge:nth-child(5) {
        animation-delay: 0.5s;
      }
      .feature-badge:nth-child(6) {
        animation-delay: 0.6s;
      }

      @keyframes slideInLeft {
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }

      .product-details {
        opacity: 0;
        transform: translateX(30px);
        transition: all 0.8s ease;
        transition-delay: 0.2s;
      }

      .product-item.animate .product-details {
        opacity: 1;
        transform: translateX(0);
      }

      .product-item.reverse .product-details {
        transform: translateX(-30px);
      }

      .product-item.reverse.animate .product-details {
        transform: translateX(0);
      }

      @media (max-width: 1024px) {
        .product-item.reverse .product-image-container,
        .product-item.reverse .product-details {
          order: initial;
        }
      }
    `,
  ],
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild("productsSection") productsSection!: ElementRef;

  private destroy$ = new Subject<void>();

  categories: ProductCategory[] = [];
  products: Product[] = [];

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.productService.categories$
      .pipe(takeUntil(this.destroy$))
      .subscribe((categories) => {
        this.categories = categories;
      });

    this.productService.products$
      .pipe(takeUntil(this.destroy$))
      .subscribe((products) => {
        this.products = products;
      });
  }

  ngAfterViewInit(): void {
    this.setupScrollAnimations();
    // this.setupParallaxEffects();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public scrollToProducts(): void {
    this.productsSection.nativeElement.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  public navigateToContact(): void {
    this.router.navigate(["/contact"]);
  }

  getCategoryName(categoryId: string): string {
    const category = this.categories.find((cat) => cat.id === categoryId);
    return category ? category.name : categoryId;
  }

  getSpecifications(specs: {
    [key: string]: string;
  }): { key: string; value: string }[] {
    return Object.entries(specs).map(([key, value]) => ({ key, value }));
  }

  getQuote(product: Product): void {
    this.router.navigate(["/contact"], {
      queryParams: {
        product: product.name,
        sku: product.sku,
      },
    });
  }

  learnMore(product: Product): void {
    // Scroll to product or show more details
    console.log("Learn more about:", product.name);
  }

  private setupScrollAnimations(): void {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: "0px 0px -100px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
        }
      });
    }, observerOptions);

    // Observe product items
    setTimeout(() => {
      const productItems = document.querySelectorAll(".product-item");
      productItems.forEach((item) => observer.observe(item));

      const animatedElements = document.querySelectorAll(".animate-on-scroll");
      animatedElements.forEach((el) => observer.observe(el));
    }, 100);
  }

  // private setupParallaxEffects(): void {
  //   window.addEventListener("scroll", () => {
  //     const scrolled = window.pageYOffset;
  //     const parallaxElements = document.querySelectorAll(".product-image-3d");

  //     parallaxElements.forEach((element, index) => {
  //       const rate = scrolled * -0.1;
  //       const yPos = -(rate / (index + 1));
  //       (
  //         element as HTMLElement
  //       ).style.transform = `translate3d(0, ${yPos}px, 0)`;
  //     });
  //   });
  // }
}
