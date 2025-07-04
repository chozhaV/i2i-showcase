export interface Product {
  id: string;
  name: string;
  sku: string;
  description: string;
  category: string;
  image: string;
  features: string[];
  specifications?: { [key: string]: string };
}

export interface ProductCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
}