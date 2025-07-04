import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="pt-24 pb-12">
      <div class="container mx-auto px-4">
        <!-- Header -->
        <div class="text-center mb-16">
          <h1 class="section-title">About i2i Smart Enterprises</h1>
          <p class="section-subtitle">
            Leading the future of technology with innovative solutions that transform businesses and communities
          </p>
        </div>

        <!-- Company Overview -->
        <section class="mb-20">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div class="animate-on-scroll">
              <h2 class="text-3xl font-bold text-white mb-6">Our Story</h2>
              <div class="space-y-4 text-dark-300 leading-relaxed">
                <p>
                  Founded with a vision to bridge the gap between innovative technology and practical business solutions, 
                  i2i Smart Enterprises has been at the forefront of digital transformation for over five years.
                </p>
                <p>
                  We specialize in providing cutting-edge technology solutions across education, security, and smart 
                  infrastructure domains, helping organizations enhance their operational efficiency and achieve their goals.
                </p>
                <p>
                  Our commitment to excellence and customer satisfaction has made us a trusted partner for businesses 
                  of all sizes, from startups to large enterprises.
                </p>
              </div>
            </div>
            <div class="animate-on-scroll">
              <div class="relative">
                <img 
                  src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=600" 
                  alt="Our team at work"
                  class="rounded-2xl shadow-2xl">
                <div class="absolute inset-0 bg-gradient-to-t from-primary-500/20 to-transparent rounded-2xl"></div>
              </div>
            </div>
          </div>
        </section>

        <!-- Mission, Vision, Values -->
        <section class="mb-20">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="card text-center animate-on-scroll">
              <div class="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-white mb-4">Our Mission</h3>
              <p class="text-dark-400 leading-relaxed">
                To empower businesses and educational institutions with innovative technology solutions that drive 
                growth, enhance security, and improve operational efficiency.
              </p>
            </div>

            <div class="card text-center animate-on-scroll">
              <div class="w-16 h-16 bg-gradient-to-r from-secondary-500 to-accent-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-white mb-4">Our Vision</h3>
              <p class="text-dark-400 leading-relaxed">
                To be the leading provider of smart technology solutions, creating a connected world where 
                technology seamlessly integrates with human needs and aspirations.
              </p>
            </div>

            <div class="card text-center animate-on-scroll">
              <div class="w-16 h-16 bg-gradient-to-r from-accent-500 to-warning-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-white mb-4">Our Values</h3>
              <p class="text-dark-400 leading-relaxed">
                Innovation, integrity, and customer-centricity guide everything we do. We believe in building 
                lasting relationships through excellence and continuous improvement.
              </p>
            </div>
          </div>
        </section>

        <!-- Core Competencies -->
        <section class="mb-20">
          <div class="text-center mb-12">
            <h2 class="section-title text-3xl">Our Expertise</h2>
            <p class="text-dark-400 max-w-2xl mx-auto">
              We bring deep expertise across multiple technology domains to deliver comprehensive solutions
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div class="bg-dark-800 border border-dark-700 rounded-xl p-6 text-center animate-on-scroll hover:border-primary-500/50 transition-all duration-300">
              <div class="text-4xl mb-4">🎓</div>
              <h3 class="text-lg font-semibold text-white mb-2">Education Technology</h3>
              <p class="text-dark-400 text-sm">Smart classrooms, interactive displays, and digital learning solutions</p>
            </div>

            <div class="bg-dark-800 border border-dark-700 rounded-xl p-6 text-center animate-on-scroll hover:border-primary-500/50 transition-all duration-300">
              <div class="text-4xl mb-4">🔒</div>
              <h3 class="text-lg font-semibold text-white mb-2">Security Systems</h3>
              <p class="text-dark-400 text-sm">Advanced surveillance, access control, and biometric solutions</p>
            </div>

            <div class="bg-dark-800 border border-dark-700 rounded-xl p-6 text-center animate-on-scroll hover:border-primary-500/50 transition-all duration-300">
              <div class="text-4xl mb-4">🏗️</div>
              <h3 class="text-lg font-semibold text-white mb-2">Smart Infrastructure</h3>
              <p class="text-dark-400 text-sm">Network infrastructure, servers, and intelligent building systems</p>
            </div>

            <div class="bg-dark-800 border border-dark-700 rounded-xl p-6 text-center animate-on-scroll hover:border-primary-500/50 transition-all duration-300">
              <div class="text-4xl mb-4">🚨</div>
              <h3 class="text-lg font-semibold text-white mb-2">Safety Systems</h3>
              <p class="text-dark-400 text-sm">Fire safety, emergency management, and compliance solutions</p>
            </div>
          </div>
        </section>

        <!-- Why Choose Us -->
        <section class="mb-20">
          <div class="bg-gradient-to-r from-primary-600/10 to-secondary-600/10 rounded-2xl p-8 md:p-12">
            <div class="text-center mb-12">
              <h2 class="text-3xl font-bold text-white mb-4">Why Choose i2i Smart Enterprises?</h2>
              <p class="text-dark-300 max-w-2xl mx-auto">
                We combine technical expertise with industry insights to deliver solutions that make a real difference
              </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div class="flex items-start space-x-4 animate-on-scroll">
                <div class="w-12 h-12 bg-primary-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-white mb-2">Proven Track Record</h3>
                  <p class="text-dark-400 text-sm">500+ successful projects across various industries</p>
                </div>
              </div>

              <div class="flex items-start space-x-4 animate-on-scroll">
                <div class="w-12 h-12 bg-secondary-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-white mb-2">Cutting-Edge Technology</h3>
                  <p class="text-dark-400 text-sm">Latest innovations and industry-leading solutions</p>
                </div>
              </div>

              <div class="flex items-start space-x-4 animate-on-scroll">
                <div class="w-12 h-12 bg-accent-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                  </svg>
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-white mb-2">Expert Team</h3>
                  <p class="text-dark-400 text-sm">Certified professionals with years of experience</p>
                </div>
              </div>

              <div class="flex items-start space-x-4 animate-on-scroll">
                <div class="w-12 h-12 bg-warning-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-white mb-2">24/7 Support</h3>
                  <p class="text-dark-400 text-sm">Round-the-clock technical support and maintenance</p>
                </div>
              </div>

              <div class="flex items-start space-x-4 animate-on-scroll">
                <div class="w-12 h-12 bg-primary-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-white mb-2">Competitive Pricing</h3>
                  <p class="text-dark-400 text-sm">Best value for money with transparent pricing</p>
                </div>
              </div>

              <div class="flex items-start space-x-4 animate-on-scroll">
                <div class="w-12 h-12 bg-secondary-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m0 0v2a1 1 0 01-1 1H8a1 1 0 01-1-1V4m0 0H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2h-3"/>
                  </svg>
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-white mb-2">Custom Solutions</h3>
                  <p class="text-dark-400 text-sm">Tailored solutions to meet your specific requirements</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- CTA Section -->
        <section class="text-center">
          <div class="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-8 md:p-12">
            <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Partner with Us?
            </h2>
            <p class="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Let's discuss how we can help transform your business with our innovative technology solutions.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <button class="bg-white text-primary-600 hover:bg-primary-50 font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105" routerLink="/contact">
                Get in Touch
              </button>
              <button class="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold py-3 px-8 rounded-lg transition-all duration-300" routerLink="/products">
                View Our Products
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  `
})
export class AboutComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    this.setupScrollAnimations();
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