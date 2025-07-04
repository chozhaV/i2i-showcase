import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ContactService } from '../../services/contact.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="pt-24 pb-12">
      <div class="container mx-auto px-4">
        <!-- Header -->
        <div class="text-center mb-16">
          <h1 class="section-title">Contact Us</h1>
          <p class="section-subtitle">
            Get in touch with our experts to discuss your technology needs and discover how we can help you
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <!-- Contact Form -->
          <div class="animate-on-scroll">
            <div class="card">
              <h2 class="text-2xl font-bold text-white mb-6">Send us a Message</h2>
              
              <form [formGroup]="contactForm" (ngSubmit)="onSubmit()" class="space-y-6">
                <div>
                  <label for="name" class="block text-sm font-medium text-dark-300 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    formControlName="name"
                    class="input-field"
                    [class.border-red-500]="contactForm.get('name')?.invalid && contactForm.get('name')?.touched"
                    placeholder="Enter your full name">
                  <div *ngIf="contactForm.get('name')?.invalid && contactForm.get('name')?.touched" 
                       class="text-red-500 text-sm mt-1">
                    Name is required
                  </div>
                </div>

                <div>
                  <label for="email" class="block text-sm font-medium text-dark-300 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    formControlName="email"
                    class="input-field"
                    [class.border-red-500]="contactForm.get('email')?.invalid && contactForm.get('email')?.touched"
                    placeholder="Enter your email address">
                  <div *ngIf="contactForm.get('email')?.invalid && contactForm.get('email')?.touched" 
                       class="text-red-500 text-sm mt-1">
                    <span *ngIf="contactForm.get('email')?.errors?.['required']">Email is required</span>
                    <span *ngIf="contactForm.get('email')?.errors?.['email']">Please enter a valid email</span>
                  </div>
                </div>

                <div>
                  <label for="phone" class="block text-sm font-medium text-dark-300 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    formControlName="phone"
                    class="input-field"
                    [class.border-red-500]="contactForm.get('phone')?.invalid && contactForm.get('phone')?.touched"
                    placeholder="Enter your phone number">
                  <div *ngIf="contactForm.get('phone')?.invalid && contactForm.get('phone')?.touched" 
                       class="text-red-500 text-sm mt-1">
                    Phone number is required
                  </div>
                </div>

                <div>
                  <label for="message" class="block text-sm font-medium text-dark-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    formControlName="message"
                    rows="5"
                    class="input-field resize-none"
                    [class.border-red-500]="contactForm.get('message')?.invalid && contactForm.get('message')?.touched"
                    placeholder="Tell us about your project or requirements..."></textarea>
                  <div *ngIf="contactForm.get('message')?.invalid && contactForm.get('message')?.touched" 
                       class="text-red-500 text-sm mt-1">
                    Message is required
                  </div>
                </div>

                <button 
                  type="submit"
                  class="btn-primary w-full"
                  [disabled]="contactForm.invalid || (loading$ | async)">
                  <span *ngIf="!(loading$ | async)">Send Message</span>
                  <span *ngIf="loading$ | async" class="flex items-center justify-center">
                    <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                </button>
              </form>

              <!-- Success Message -->
              <div *ngIf="showSuccess" class="mt-6 p-4 bg-green-500/20 border border-green-500/50 rounded-lg">
                <div class="flex items-center">
                  <svg class="w-5 h-5 text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <p class="text-green-400 font-medium">
                    Thank you! Your message has been sent successfully. We'll get back to you soon.
                  </p>
                </div>
              </div>

              <!-- Error Message -->
              <div *ngIf="showError" class="mt-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
                <div class="flex items-center">
                  <svg class="w-5 h-5 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <p class="text-red-400 font-medium">
                    Sorry, there was an error sending your message. Please try again.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Contact Information -->
          <div class="space-y-8 animate-on-scroll">
            <!-- Contact Details -->
            <div class="card">
              <h2 class="text-2xl font-bold text-white mb-6">Get in Touch</h2>
              <div class="space-y-6">
                <div class="flex items-start space-x-4">
                  <div class="w-12 h-12 bg-primary-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 class="text-lg font-semibold text-white mb-1">Office Address</h3>
                    <p class="text-dark-400">
                      123 Technology Street<br>
                      Smart City, SC 12345<br>
                      United States
                    </p>
                  </div>
                </div>

                <div class="flex items-start space-x-4">
                  <div class="w-12 h-12 bg-secondary-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 class="text-lg font-semibold text-white mb-1">Phone</h3>
                    <p class="text-dark-400">
                      +1 (555) 123-4567<br>
                      +1 (555) 123-4568 (Support)
                    </p>
                  </div>
                </div>

                <div class="flex items-start space-x-4">
                  <div class="w-12 h-12 bg-accent-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 class="text-lg font-semibold text-white mb-1">Email</h3>
                    <p class="text-dark-400">
                      info&#64;i2ismartenterprises.com<br>
                      support&#64;i2ismartenterprises.com
                    </p>
                  </div>
                </div>

                <div class="flex items-start space-x-4">
                  <div class="w-12 h-12 bg-warning-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 class="text-lg font-semibold text-white mb-1">Business Hours</h3>
                    <p class="text-dark-400">
                      Monday - Friday: 9:00 AM - 6:00 PM<br>
                      Saturday: 10:00 AM - 4:00 PM<br>
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Why Contact Us -->
            <div class="card">
              <h3 class="text-xl font-bold text-white mb-4">Why Contact Us?</h3>
              <div class="space-y-3">
                <div class="flex items-center space-x-3">
                  <svg class="w-5 h-5 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <span class="text-dark-300">Free consultation and project assessment</span>
                </div>
                <div class="flex items-center space-x-3">
                  <svg class="w-5 h-5 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <span class="text-dark-300">Custom solutions tailored to your needs</span>
                </div>
                <div class="flex items-center space-x-3">
                  <svg class="w-5 h-5 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <span class="text-dark-300">Expert technical support and guidance</span>
                </div>
                <div class="flex items-center space-x-3">
                  <svg class="w-5 h-5 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <span class="text-dark-300">Quick response time within 24 hours</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ContactComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  
  contactForm: FormGroup;
  loading$ = this.contactService.loading$;
  showSuccess = false;
  showError = false;

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService
  ) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Setup scroll animations after view init
    setTimeout(() => {
      this.setupScrollAnimations();
    }, 100);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  async onSubmit(): Promise<void> {
    if (this.contactForm.valid) {
      this.showSuccess = false;
      this.showError = false;
      
      const formData = this.contactForm.value;
      const success = await this.contactService.sendContactForm(formData);
      
      if (success) {
        this.showSuccess = true;
        this.contactForm.reset();
        
        // Hide success message after 5 seconds
        setTimeout(() => {
          this.showSuccess = false;
        }, 5000);
      } else {
        this.showError = true;
        
        // Hide error message after 5 seconds
        setTimeout(() => {
          this.showError = false;
        }, 5000);
      }
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.contactForm.controls).forEach(key => {
        this.contactForm.get(key)?.markAsTouched();
      });
    }
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