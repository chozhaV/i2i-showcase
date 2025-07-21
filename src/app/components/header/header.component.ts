import { Component, HostListener } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Router } from "@angular/router";

@Component({
  selector: "app-header",
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header
      class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      [class.bg-white]="isScrolled || mobileMenuOpen"
      [class.bg-transparent]="!isScrolled && !mobileMenuOpen"
      [class.backdrop-blur-sm]="isScrolled"
      [class.shadow-lg]="isScrolled"
    >
      <nav class="container mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          <!-- Logo -->
          <div class="flex items-center space-x-3">
            <div
              class="w-10 h-10 from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center"
            >
              <img src="assets/products/logo.png" alt="Logo" class="w-8 h-8" />
            </div>
            <div>
              <h1 class="text-xl font-bold text-gray-900">
                i2i Smart Enterprises
              </h1>
              <p class="text-xs text-gray-600">Smart Technology Solutions</p>
            </div>
          </div>

          <!-- Desktop Navigation -->
          <div class="hidden md:flex items-center space-x-10">
            <a
              routerLink="/"
              routerLinkActive="text-primary-400"
              [routerLinkActiveOptions]="{ exact: true }"
              class="nav-link"
            >
              Home
            </a>
            <a
              routerLink="/about"
              routerLinkActive="text-primary-400"
              class="nav-link whitespace-nowrap"
            >
              About Us
            </a>
            <a
              routerLink="/contact"
              routerLinkActive="text-primary-400"
              class="nav-link"
            >
              Contact
            </a>
            <button class="i2i-light-button" (click)="navigateToContact()">
              <span (click)="navigateToContact()">Get Quote</span>
            </button>
          </div>

          <!-- Mobile Menu Button -->
          <button
            class="md:hidden text-gray-900 focus:outline-none"
            (click)="toggleMobileMenu()"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                [attr.d]="
                  mobileMenuOpen
                    ? 'M6 18L18 6M6 6l12 12'
                    : 'M4 6h16M4 12h16M4 18h16'
                "
              ></path>
            </svg>
          </button>
        </div>

        <!-- Mobile Navigation -->
        <div
          class="md:hidden transition-all duration-300 overflow-hidden"
          [class.max-h-0]="!mobileMenuOpen"
          [class.max-h-96]="mobileMenuOpen"
        >
          <div class="pt-4 pb-2 space-y-2">
            <a
              routerLink="/"
              routerLinkActive="text-primary-400"
              [routerLinkActiveOptions]="{ exact: true }"
              class="mobile-nav-link"
              (click)="closeMobileMenu()"
            >
              Home
            </a>
            <a
              routerLink="/about"
              routerLinkActive="text-primary-400"
              class="mobile-nav-link"
              (click)="closeMobileMenu()"
            >
              About Us
            </a>
            <a
              routerLink="/contact"
              routerLinkActive="text-primary-400"
              class="mobile-nav-link"
              (click)="closeMobileMenu()"
            >
              Contact
            </a>
            <div class="pt-2">
              <button
                class="i2i-light-button"
                (click)="navigateToContact(); closeMobileMenu()"
              >
                Get Quote
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  `,
  styles: [
    `
      .nav-link {
        @apply text-gray-600 hover:text-gray-900 transition-colors duration-300 font-medium;
      }

      .mobile-nav-link {
        @apply block py-2 px-4 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-300;
      }
      .i2i-light-button {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        background-color: white;
        color: #004A99;
        border: 2px solid #004A99;
        border-radius: 8px;
        padding: 14px 18px;
        font-weight: 600;
        font-family: 'Segoe UI', sans-serif;
        font-size: 15px;
        cursor: pointer;
        transition: background-color 0.3s ease, color 0.3s ease;
      }
      .i2i-light-button img {
        height: 22px;
        width: auto;
      }

      .i2i-light-button:hover {
        background-color: #004A99;
        color: white;
      }

      .i2i-light-button:active {
        transform: scale(0.98);
      }

    `,
  ],
})
export class HeaderComponent {
  isScrolled = false;
  mobileMenuOpen = false;

  constructor(private router: Router) {}

  @HostListener("window:scroll", [])
  onWindowScroll() {
    this.isScrolled = window.pageYOffset > 10;
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMobileMenu() {
    this.mobileMenuOpen = false;
  }

  navigateToContact() {
    this.router.navigate(["/contact"]);
  }
}
