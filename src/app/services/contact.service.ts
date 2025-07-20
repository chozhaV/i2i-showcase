import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import emailjs from '@emailjs/browser';

export interface ContactForm {
  name: string;
  email: string;
  phone: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

  constructor() {
    // Initialize EmailJS with your public key
    // emailjs.init('YOUR_PUBLIC_KEY');
  }

  async sendContactForm(formData: ContactForm): Promise<boolean> {
    this.loadingSubject.next(true);
    
    try {
      // Simulate API call for demo purposes
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In production, uncomment and configure EmailJS:
      /*
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        message: formData.message,
        to_name: 'i2i Smart Enterprises',
      };

      await emailjs.send(
        'YOUR_SERVICE_ID',
        'YOUR_TEMPLATE_ID',
        templateParams
      );
      */

      console.log('Contact form submitted:', formData);
      this.loadingSubject.next(false);
      return true;
    } catch (error) {
      console.error('Error sending contact form:', error);
      this.loadingSubject.next(false);
      return false;
    }
  }
}