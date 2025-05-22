import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  trigger,
  style,
  transition,
  animate,
  state,
} from '@angular/animations';
import { ScrollAnimateDirective } from '../../directives/scroll-animate.directive';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ScrollAnimateDirective],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('fadeSlideIn', [
      state('hidden', style({ opacity: 0, transform: 'translateY(20px)' })),
      state('visible', style({ opacity: 1, transform: 'translateY(0)' })),
      transition('hidden => visible', animate('800ms ease-out')),
    ]),
  ],
})
export class HomeComponent {
  isVisible = false;
  products = [
    {
      name: 'CAMERA',
      sku: 'SKU00001',
      image: 'assets/products/product1.png',
    },
    {
      name: 'INTERACTIVE FLAT PANEL',
      sku: 'SKU00002',
      image: 'assets/products/product2.png',
    },
    {
      name: 'INTERACTIVE PEN DISPLAY',
      sku: 'SKU00003',
      image: 'assets/products/product3.png',
    },
    {
      name: 'GREEN BOARD',
      sku: 'SKU00004',
      image: 'assets/products/product4.png',
    },
    {
      name: 'LONG THROW PROJECTOR',
      sku: 'SKU00005',
      image: 'assets/products/product5.png',
    },
    {
      name: 'ULTRA SHORT THROW PROJECTOR',
      sku: 'SKU00005',
      image: 'assets/products/product6.png',
    },
    {
      name: 'CABINET',
      sku: 'SKU00006',
      image: 'assets/products/product7.png',
    },
    {
      name: 'BIOMETRIC SYSTEM',
      sku: 'SKU00007',
      image: 'assets/products/product8.png',
    },
    {
      name: 'INTERACTIVE WHITE BOARD',
      sku: 'SKU00008',
      image: 'assets/products/product9.png',
    },
    {
      name: 'SERVER',
      sku: 'SKU00009',
      image: 'assets/products/product10.png',
    },
    {
      name: 'ACCESSORIES',
      sku: 'SKU00010',
      image: 'assets/products/product11.png',
    },
    {
      name: 'INTERCOM SYSTEM',
      sku: 'SKU00011',
      image: 'assets/products/product12.png',
    },
    {
      name: 'NETWORK',
      sku: 'SKU00012',
      image: 'assets/products/product13.png',
    },
    {
      name: 'SCREEN',
      sku: 'SKU00013',
      image: 'assets/products/product14.png',
    },
    {
      name: 'SYSTEM',
      sku: 'SKU00014',
      image: 'assets/products/product15.png',
    },
    {
      name: 'LAMP',
      sku: 'SKU00015',
      image: 'assets/products/product16.png',
    },
    {
      name: 'RGB',
      sku: 'SKU00016',
      image: 'assets/products/product17.png',
    },
    {
      name: 'FIRE AND SAFETY SYSTEM',
      sku: 'SKU00017',
      image: 'assets/products/product18.png',
    },
  ];

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const triggerPoint = window.innerHeight / 1.3;
    const element = document.querySelector('.hero');
    if (element && element.getBoundingClientRect().top < triggerPoint) {
      this.isVisible = true;
    }
  }
}
