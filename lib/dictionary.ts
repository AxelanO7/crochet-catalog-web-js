export const dictionaries = {
  id: {
    heroTitle: 'Butik Rajut Modern',
    heroSubtitle: 'Handcrafted dengan penuh kehangatan dari Indonesia. Temukan koleksi eksklusif kami.',
    backToCatalog: '← Kembali ke Katalog',
    inquireTitle: 'Tertarik dengan produk ini?',
    btnLocal: 'Tanya Harga & Stok',
    btnGlobal: 'International Inquiry',
    emptyCatalog: 'Belum ada produk.',
    disclaimer: '* Warna asli dapat sedikit berbeda karena pencahayaan atau resolusi layar.',
  },
  en: {
    heroTitle: 'Modern Warm Boutique',
    heroSubtitle: 'Handcrafted with warmth from Indonesia. Discover our exclusive collection.',
    backToCatalog: '← Back to Catalog',
    inquireTitle: 'Interested in this product?',
    btnLocal: 'Tanya Harga & Stok',
    btnGlobal: 'International Inquiry',
    emptyCatalog: 'No products available.',
    disclaimer: '* Actual colors may vary slightly due to lighting and display outputs.',
  }
} as const;

export type Locale = keyof typeof dictionaries;

export const getDictionary = (lang: string) => dictionaries[lang as Locale] || dictionaries['id'];
