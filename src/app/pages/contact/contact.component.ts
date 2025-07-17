import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ContactService } from '../../services/contact.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
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