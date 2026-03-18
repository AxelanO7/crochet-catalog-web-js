export interface Product {
  id: string;
  name: {
    id: string;
    en: string;
  };
  slug: string;
  description: {
    id: string;
    en: string;
  };
  category: {
    id: string;
    en: string;
  };
  status: 'READY STOCK' | 'PRE-ORDER';
  image_url: string;
}

export const products: Product[] = [
  {
    id: '1',
    name: {
      id: 'Bralet Senja Oesapa',
      en: 'Oesapa Sunset Bralette'
    },
    slug: 'oesapa-sunset-bralette',
    description: {
      id: 'Dibuat dengan tangan menggunakan katun premium yang bernapas. Terinspirasi dari warna hangat matahari terbenam pantai Oesapa.',
      en: 'Handcrafted with premium breathable cotton. Inspired by the warm hues of Oesapa beach sunsets.'
    },
    category: {
      id: 'Pakaian Resor',
      en: 'Resort Wear'
    },
    status: 'READY STOCK',
    image_url: 'https://images.unsplash.com/photo-1529336953128-a85760f58cb5?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '2',
    name: {
      id: 'Penutup Jaring Pulau Rote',
      en: 'Rote Island Mesh Cover-Up'
    },
    slug: 'rote-island-mesh-cover-up',
    description: {
      id: 'Penutup jaring ultra-ringan dengan teknik simpul berpadu tradisional Kupang.',
      en: 'An ultra-lightweight mesh cover-up featuring traditional Kupang-inspired knotting techniques.'
    },
    category: {
      id: 'Pakaian Resor',
      en: 'Resort Wear'
    },
    status: 'PRE-ORDER',
    image_url: 'https://images.unsplash.com/photo-1605763240000-7e93b172d754?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '3',
    name: {
      id: 'Tas Tote Rajut Lasiana',
      en: 'Lasiana Chunky Tote Bag'
    },
    slug: 'lasiana-chunky-tote-bag',
    description: {
      id: 'Tahan lama, bergaya, dan luas. Tas jinjing rajut rajutan ini ditenun dari benang lokal yang ramah lingkungan.',
      en: 'Durable, stylish, and spacious. This chunky crochet tote bag is woven from eco-friendly local yarn.'
    },
    category: {
      id: 'Tas',
      en: 'Bags'
    },
    status: 'READY STOCK',
    image_url: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '4',
    name: {
      id: 'Topi Matahari Timor',
      en: 'Timor Sun Hat'
    },
    slug: 'timor-sun-hat',
    description: {
      id: 'Topi ember rajut yang struktural namun fleksibel. Dirancang untuk melindungi Anda dari terik matahari.',
      en: 'A structural yet flexible crochet bucket hat. Designed to protect you from the tropical sun.'
    },
    category: {
      id: 'Aksesoris',
      en: 'Accessories'
    },
    status: 'PRE-ORDER',
    image_url: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '5',
    name: {
      id: 'Set Tatakan Gelas Makrame Flobamora',
      en: 'Flobamora Macrame Coaster Set'
    },
    slug: 'flobamora-macrame-coaster-set',
    description: {
      id: 'Set 4 tatakan gelas makrame buatan tangan dengan warna alami yang hangat.',
      en: 'Set of 4 artisan macrame coasters in warm earth tones.'
    },
    category: {
      id: 'Dekorasi Rumah',
      en: 'Home Decor'
    },
    status: 'READY STOCK',
    image_url: 'https://images.unsplash.com/photo-1584589167171-541ce45f1eea?auto=format&fit=crop&w=800&q=80',
  }
];
