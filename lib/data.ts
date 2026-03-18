export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  status: 'READY STOCK' | 'PRE-ORDER';
  image_url: string;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Oesapa Sunset Bralette',
    slug: 'oesapa-sunset-bralette',
    description: 'Handcrafted with premium breathable cotton. Inspired by the warm hues of Oesapa beach sunsets. Perfect for your tropical getaways or layering under a sheer cover-up.',
    category: 'Resort Wear',
    status: 'READY STOCK',
    image_url: 'https://images.unsplash.com/photo-1550639524-a6f58345a278?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '2',
    name: 'Rote Island Mesh Cover-Up',
    slug: 'rote-island-mesh-cover-up',
    description: 'An ultra-lightweight mesh cover-up featuring traditional Kupang-inspired knotting techniques. Provides an elegant, effortless silhouette over your swimwear.',
    category: 'Resort Wear',
    status: 'PRE-ORDER',
    image_url: 'https://images.unsplash.com/photo-1605763240000-7e93b172d754?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '3',
    name: 'Lasiana Chunky Tote Bag',
    slug: 'lasiana-chunky-tote-bag',
    description: 'Durable, stylish, and spacious. This chunky crochet tote bag is woven from eco-friendly local yarn. Ideal for carrying your beach essentials or daily tech gear in style.',
    category: 'Bags',
    status: 'READY STOCK',
    image_url: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '4',
    name: 'Timor Sun Hat',
    slug: 'timor-sun-hat',
    description: 'A structural yet flexible crochet bucket hat. Designed to protect you from the tropical sun while elevating your boho-chic aesthetic. Made to order for the perfect fit.',
    category: 'Accessories',
    status: 'PRE-ORDER',
    image_url: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '5',
    name: 'Flobamora Macrame Coaster Set',
    slug: 'flobamora-macrame-coaster-set',
    description: 'Set of 4 artisan macrame coasters in warm earth tones. Add a touch of minimalist, handcrafted luxury to your coffee table or workspace.',
    category: 'Home Decor',
    status: 'READY STOCK',
    image_url: 'https://images.unsplash.com/photo-1616628188506-4b18ec4bd640?auto=format&fit=crop&w=800&q=80',
  }
];
