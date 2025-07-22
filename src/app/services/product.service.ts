import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Product, ProductCategory } from "../models/product.model";

@Injectable({
  providedIn: "root",
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
        id: "2",
        name: "Interactive Flat Panel",
        sku: "IFP-001",
        description:
          "Smart interactive display for modern classrooms and meeting rooms",
        category: "education",
        image: "assets/products/product2.png",
        features: [
          "Touch Screen",
          "Multi-User Support",
          "Wireless Connectivity",
          "Built-in Apps",
        ],
        specifications: {
          "Screen Size": "All Sizes Available",
          "Touch Points": "Any Point",
          OS: "Advanced Android OS",
        },
      },
      {
        id: "1",
        name: "Security Camera System",
        sku: "CAM-001",
        description:
          "High-definition security camera with night vision and motion detection",
        category: "security",
        image: "assets/products/product1.png",
        features: [
          "4K Resolution",
          "Night Vision",
          "Motion Detection",
          "Weather Resistant",
        ],
        specifications: {
          Resolution: "4K Ultra HD",
          Storage: "Cloud & Local",
          Connectivity: "WiFi/Ethernet",
        },
      },
      {
        id: "3",
        name: "Interactive Pen Display",
        sku: "IPD-001",
        description: "Professional pen display for digital art and design work",
        category: "education",
        image: "assets/products/product3.png",
        features: [
          "Pressure Sensitivity",
          "Tilt Support",
          "Color Accuracy",
          "Ergonomic Design",
        ],
        specifications: {
          "Screen Size": "All Sizes Available",
          "Pressure Levels": "8192",
          "Color Gamut": "99% sRGB",
        },
      },
      {
        id: "4",
        name: "Smart Green Board",
        sku: "GB-001",
        description: "Eco-friendly interactive whiteboard with smart features",
        category: "education",
        image: "assets/products/product4.png",
        features: [
          "Eco-Friendly",
          "Smart Recognition",
          "Multi-Touch",
          "Easy Installation",
        ],
        specifications: {
          Size: "All Sizes Available",
          "Touch Technology": "No",
          Surface: "Normal Whiteboard Surface",
        },
      },
      {
        id: "5",
        name: "Long Throw Projector",
        sku: "LTP-001",
        description:
          "High-brightness projector for large venues and auditoriums",
        category: "education",
        image: "assets/products/product5.png",
        features: [
          "High Brightness",
          "Long Throw Distance",
          "4K Support",
          "Laser Technology",
        ],
        specifications: {
          Brightness: "5000+ Lumens",
          Resolution: "4K UHD",
          "Throw Ratio": "1.6:1 - 2.4:1",
        },
      },
      {
        id: "6",
        name: "Biometric Access System",
        sku: "BAS-001",
        description:
          "Advanced biometric security system with fingerprint and facial recognition",
        category: "security",
        image: "assets/products/product6.png",
        features: [
          "Fingerprint Scanner",
          "Facial Recognition",
          "Access Control",
          "Audit Trail",
        ],
        specifications: {
          "Recognition Speed": "<1 Second",
          Capacity: "more than 1,00,000 users",
          Accuracy: "99.9%",
        },
      },
      {
        id: "7",
        name: "Intercom System",
        sku: "INT-001",
        description: "Digital intercom system for buildings and facilities",
        category: "security",
        image: "assets/products/product7.png",
        features: [
          "Two-Way Audio",
          "Video Calling",
          "Remote Access",
          "Integration Ready",
        ],
        specifications: {
          "Audio Quality": "HD Voice",
          Video: "1080p HD",
          Power: "PoE Supported",
        },
      },
      {
        id: "8",
        name: "Server",
        sku: "SNS-001",
        description: "Complete server and networking infrastructure solutions",
        category: "infrastructure",
        image: "assets/products/product8.png",
        features: [
          "High Performance",
          "Scalable",
          "Redundancy",
          "24/7 Support",
        ],
        specifications: {
          "Processing Power": "Intel Xeon",
          Memory: "Up to 1TB RAM",
          Storage: "SSD/NVMe",
        },
      },
      {
        id: "9",
        name: "ULTRA SHORT THROW PROJECTOR",
        sku: "SNS-001",
        description:
          "An ultra-short throw projector displays a large image from a very short distance, ideal for small spaces.",
        category: "education",
        image: "assets/products/product9.png",
        features: [
          "Space-Saving Placement",
          "High Performance",
          "Reduced Shadows & Glare",
          "Interactive Capabilities",
        ],
        specifications: {
          "Throw Ratio": "0.23:1 or 0.3:1",
          "Brightness (Lumens)": "5,000 lumens",
          Resolution: "4K UHD (3840x2160)",
        },
      },
      {
        id: "10",
        name: "CABINET",
        sku: "SNS-001",
        description:
          "Smart cabinets are technologically enhanced storage units that offer automated inventory tracking, secure access control, and remote monitoring capabilities.",
        category: "education",
        image: "assets/products/product10.png",
        features: [
          "Automated Inventory Management",
          "Secure and Controlled Access",
          "Environmental Monitoring",
          "Connectivity and Remote Management",
        ],
        specifications: {
          "Control Technology": "RFID/NFC, PIN Keypad",
          "Sensor Type": "RFID antenna, RFID reader",
          Connectivity: "WIFI, Ethernet, 4G LTE modem",
        },
      },
      {
        id: "11",
        name: "INTERACTIVE WHITE BOARD",
        sku: "SNS-001",
        description:
          "Control computer applications and annotate directly on the projected image using a pen, touch, or other devices",
        category: "education",
        image: "assets/products/product11.png",
        features: [
          "Touch/Pen Interactivity",
          "Digital Content Integration",
          "Real-time Collaboration & Annotation",
          "Recording & Sharing Capabilities",
        ],
        specifications: {
          "Display Technology": "Resistive, Capacitive",
          Resolution: "4K UHD",
          "Touch Points": "Multi-touch",
        },
      },
      {
        id: "13",
        name: "INTERCOM SYSTEM",
        sku: "SNS-001",
        description:
          "An intercom system is an electronic communication device that allows two or more people to speak to each other over a short or long distance.",
        category: "education",
        image: "assets/products/product13.png",
        features: [
          "Communication",
          "Security",
          "Convenience",
          "Access Control",
        ],
        specifications: {
          "Range/Coverage": "Transmit audio",
          "Channels/Zones": "Independent communication",
          "Power Source": "AC adapter, PoE",
        },
      },
      {
        id: "14",
        name: "WIFI Network",
        sku: "SNS-001",
        description:
          "A Wi-Fi network is a wireless local area network (WLAN) that uses radio waves to provide high-speed internet and network connections to devices.",
        category: "education",
        image: "assets/products/product14.png",
        features: ["Wireless", "Connectivity", "Speed", "Coverage"],
        specifications: {
          "Frequency Band": "T5 GHz, 6 GHz",
          "Wi-Fi Standard": "802.11be (Wi-Fi 7)",
          Protocols: "WPA2, WPA3",
        },
      },
      {
        id: "15",
        name: "System",
        sku: "SNS-001",
        description:
          "We are providing A desktop system is a personal computer designed for regular use.",
        category: "education",
        image: "assets/products/product15.png",
        features: [
          "Customizability",
          "Performance",
          "Ergonomics",
          "Cost-Effectiveness",
        ],
      },
      {
        id: "12",
        name: "ACCESSORIES",
        sku: "SNS-001",
        description:
          "We provide a comprehensive range of accessories to complement all your product needs.",
        category: "education",
        image: "assets/products/product12.png",
        features: [],
        specifications: {},
      },
      {
        id: "16",
        name: "Fire & Safety System",
        sku: "FSS-001",
        description:
          "A fire and safety system is a comprehensive set of measures, equipment, and procedures designed to detect, prevent, and mitigate the effects of fires and other safety hazards, ensuring the protection of lives, property, and the environment.",
        category: "safety",
        image: "assets/products/product16.png",
        features: [
          "Smoke Detection",
          "Auto Suppression",
          "Emergency Alerts",
          "Central Monitoring",
        ],
        specifications: {
          "Detection Type": "Multi-Sensor",
          "Response Time": "<30 Seconds",
          Coverage: "Up to 10,000 sq ft",
        },
      },
    ];

    this.productsSubject.next(products);
  }

  private loadCategories(): void {
    const categories: ProductCategory[] = [
      {
        id: "education",
        name: "Education Technology",
        description: "Smart solutions for modern learning environments",
        icon: "🎓",
      },
      {
        id: "security",
        name: "Security Systems",
        description: "Advanced security and surveillance solutions",
        icon: "🔒",
      },
      {
        id: "infrastructure",
        name: "Smart Infrastructure",
        description: "Network and server infrastructure solutions",
        icon: "🏗️",
      },
      {
        id: "safety",
        name: "Safety Systems",
        description: "Fire safety and emergency management systems",
        icon: "🚨",
      },
    ];

    this.categoriesSubject.next(categories);
  }

  getProductsByCategory(categoryId: string): Observable<Product[]> {
    return new Observable((observer) => {
      this.products$.subscribe((products) => {
        const filteredProducts = products.filter(
          (product) => product.category === categoryId
        );
        observer.next(filteredProducts);
      });
    });
  }

  getProductById(id: string): Observable<Product | undefined> {
    return new Observable((observer) => {
      this.products$.subscribe((products) => {
        const product = products.find((p) => p.id === id);
        observer.next(product);
      });
    });
  }
}
