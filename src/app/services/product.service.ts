import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product, ProductCategory } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsSubject = new BehaviorSubject<Product[]>([]);
  private categoriesSubject = new BehaviorSubject<ProductCategory[]>([]);

  products$ = this.productsSubject.asObservable();
  categories$ = this.categoriesSubject.asObservable();

  constructor() {
    this.loadProducts();
    this.loadCategories();
  }

  private loadProducts(): void {
    const products: Product[] = [
      {
        id: '1',
        name: 'Security Camera System',
        sku: 'CAM-001',
        description: 'High-definition security camera with night vision and motion detection',
        category: 'security',
        image: 'https://images.pexels.com/photos/430208/pexels-photo-430208.jpeg?auto=compress&cs=tinysrgb&w=400',
        features: ['4K Resolution', 'Night Vision', 'Motion Detection', 'Weather Resistant'],
        specifications: {
          'Resolution': '4K Ultra HD',
          'Storage': 'Cloud & Local',
          'Connectivity': 'WiFi/Ethernet'
        }
      },
      {
        id: '2',
        name: 'Interactive Flat Panel',
        sku: 'IFP-001',
        description: 'Smart interactive display for modern classrooms and meeting rooms',
        category: 'education',
        image: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=400',
        features: ['Touch Screen', 'Multi-User Support', 'Wireless Connectivity', 'Built-in Apps'],
        specifications: {
          'Screen Size': '65" - 86"',
          'Touch Points': '20 Points',
          'OS': 'Android 11'
        }
      },
      {
        id: '3',
        name: 'Interactive Pen Display',
        sku: 'IPD-001',
        description: 'Professional pen display for digital art and design work',
        category: 'education',
        image: 'https://images.pexels.com/photos/265152/pexels-photo-265152.jpeg?auto=compress&cs=tinysrgb&w=400',
        features: ['Pressure Sensitivity', 'Tilt Support', 'Color Accuracy', 'Ergonomic Design'],
        specifications: {
          'Screen Size': '15.6" - 27"',
          'Pressure Levels': '8192',
          'Color Gamut': '99% sRGB'
        }
      },
      {
        id: '4',
        name: 'Smart Green Board',
        sku: 'GB-001',
        description: 'Eco-friendly interactive whiteboard with smart features',
        category: 'education',
        image: 'https://images.pexels.com/photos/256417/pexels-photo-256417.jpeg?auto=compress&cs=tinysrgb&w=400',
        features: ['Eco-Friendly', 'Smart Recognition', 'Multi-Touch', 'Easy Installation'],
        specifications: {
          'Size': '78" - 100"',
          'Touch Technology': 'Infrared',
          'Surface': 'Ceramic Steel'
        }
      },
      {
        id: '5',
        name: 'Long Throw Projector',
        sku: 'LTP-001',
        description: 'High-brightness projector for large venues and auditoriums',
        category: 'education',
        image: 'https://images.pexels.com/photos/2240763/pexels-photo-2240763.jpeg?auto=compress&cs=tinysrgb&w=400',
        features: ['High Brightness', 'Long Throw Distance', '4K Support', 'Laser Technology'],
        specifications: {
          'Brightness': '5000+ Lumens',
          'Resolution': '4K UHD',
          'Throw Ratio': '1.6:1 - 2.4:1'
        }
      },
      {
        id: '6',
        name: 'Biometric Access System',
        sku: 'BAS-001',
        description: 'Advanced biometric security system with fingerprint and facial recognition',
        category: 'security',
        image: 'https://images.pexels.com/photos/2877297/pexels-photo-2877297.jpeg?auto=compress&cs=tinysrgb&w=400',
        features: ['Fingerprint Scanner', 'Facial Recognition', 'Access Control', 'Audit Trail'],
        specifications: {
          'Recognition Speed': '<1 Second',
          'Capacity': '10,000 Users',
          'Accuracy': '99.9%'
        }
      },
      {
        id: '7',
        name: 'Intercom System',
        sku: 'INT-001',
        description: 'Digital intercom system for buildings and facilities',
        category: 'security',
        image: 'https://images.pexels.com/photos/159711/phone-old-year-built-1955-bakelite-159711.jpeg?auto=compress&cs=tinysrgb&w=400',
        features: ['Two-Way Audio', 'Video Calling', 'Remote Access', 'Integration Ready'],
        specifications: {
          'Audio Quality': 'HD Voice',
          'Video': '1080p HD',
          'Power': 'PoE Supported'
        }
      },
      {
        id: '8',
        name: 'Server & Network Solutions',
        sku: 'SNS-001',
        description: 'Complete server and networking infrastructure solutions',
        category: 'infrastructure',
        image: 'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=400',
        features: ['High Performance', 'Scalable', 'Redundancy', '24/7 Support'],
        specifications: {
          'Processing Power': 'Intel Xeon',
          'Memory': 'Up to 1TB RAM',
          'Storage': 'SSD/NVMe'
        }
      },
      {
        id: '9',
        name: 'Fire & Safety System',
        sku: 'FSS-001',
        description: 'Comprehensive fire detection and safety management system',
        category: 'safety',
        image: 'https://images.pexels.com/photos/618848/pexels-photo-618848.jpeg?auto=compress&cs=tinysrgb&w=400',
        features: ['Smoke Detection', 'Auto Suppression', 'Emergency Alerts', 'Central Monitoring'],
        specifications: {
          'Detection Type': 'Multi-Sensor',
          'Response Time': '<30 Seconds',
          'Coverage': 'Up to 10,000 sq ft'
        }
      }
    ];

    this.productsSubject.next(products);
  }

  private loadCategories(): void {
    const categories: ProductCategory[] = [
      {
        id: 'education',
        name: 'Education Technology',
        description: 'Smart solutions for modern learning environments',
        icon: '🎓'
      },
      {
        id: 'security',
        name: 'Security Systems',
        description: 'Advanced security and surveillance solutions',
        icon: '🔒'
      },
      {
        id: 'infrastructure',
        name: 'Smart Infrastructure',
        description: 'Network and server infrastructure solutions',
        icon: '🏗️'
      },
      {
        id: 'safety',
        name: 'Safety Systems',
        description: 'Fire safety and emergency management systems',
        icon: '🚨'
      }
    ];

    this.categoriesSubject.next(categories);
  }

  getProductsByCategory(categoryId: string): Observable<Product[]> {
    return new Observable(observer => {
      this.products$.subscribe(products => {
        const filteredProducts = products.filter(product => product.category === categoryId);
        observer.next(filteredProducts);
      });
    });
  }

  getProductById(id: string): Observable<Product | undefined> {
    return new Observable(observer => {
      this.products$.subscribe(products => {
        const product = products.find(p => p.id === id);
        observer.next(product);
      });
    });
  }
}