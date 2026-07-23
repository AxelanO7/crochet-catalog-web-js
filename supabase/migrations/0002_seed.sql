insert into categories (slug, name_id, name_en, order_index) values
  ('resort-wear', 'Pakaian Resor', 'Resort Wear', 1),
  ('bags', 'Tas', 'Bags', 2),
  ('accessories', 'Aksesoris', 'Accessories', 3),
  ('home-decor', 'Dekorasi Rumah', 'Home Decor', 4);

insert into products (slug, category_id, name_id, name_en, desc_id, desc_en, price, status, order_index) values
  ('oesapa-sunset-bralette', (select id from categories where slug = 'resort-wear'),
   'Bralet Senja Oesapa', 'Oesapa Sunset Bralette',
   'Dibuat dengan tangan menggunakan katun premium yang bernapas. Terinspirasi dari warna hangat matahari terbenam pantai Oesapa.',
   'Handcrafted with premium breathable cotton. Inspired by the warm hues of Oesapa beach sunsets.',
   185000, 'READY STOCK', 1),
  ('rote-island-mesh-cover-up', (select id from categories where slug = 'resort-wear'),
   'Penutup Jaring Pulau Rote', 'Rote Island Mesh Cover-Up',
   'Penutup jaring ultra-ringan dengan teknik simpul berpadu tradisional Kupang.',
   'An ultra-lightweight mesh cover-up featuring traditional Kupang-inspired knotting techniques.',
   225000, 'PRE-ORDER', 2),
  ('lasiana-chunky-tote-bag', (select id from categories where slug = 'bags'),
   'Tas Tote Rajut Lasiana', 'Lasiana Chunky Tote Bag',
   'Tahan lama, bergaya, dan luas. Tas jinjing rajut rajutan ini ditenun dari benang lokal yang ramah lingkungan.',
   'Durable, stylish, and spacious. This chunky crochet tote bag is woven from eco-friendly local yarn.',
   165000, 'READY STOCK', 1),
  ('timor-sun-hat', (select id from categories where slug = 'accessories'),
   'Topi Matahari Timor', 'Timor Sun Hat',
   'Topi ember rajut yang struktural namun fleksibel. Dirancang untuk melindungi Anda dari terik matahari.',
   'A structural yet flexible crochet bucket hat. Designed to protect you from the tropical sun.',
   135000, 'PRE-ORDER', 1),
  ('flobamora-macrame-coaster-set', (select id from categories where slug = 'home-decor'),
   'Set Tatakan Gelas Makrame Flobamora', 'Flobamora Macrame Coaster Set',
   'Set 4 tatakan gelas makrame buatan tangan dengan warna alami yang hangat.',
   'Set of 4 artisan macrame coasters in warm earth tones.',
   95000, 'READY STOCK', 1);

insert into product_images (product_id, url, order_index) values
  ((select id from products where slug = 'oesapa-sunset-bralette'), 'https://images.unsplash.com/photo-1529336953128-a85760f58cb5?auto=format&fit=crop&w=1200&q=80', 1),
  ((select id from products where slug = 'rote-island-mesh-cover-up'), 'https://images.unsplash.com/photo-1605763240000-7e93b172d754?auto=format&fit=crop&w=1200&q=80', 1),
  ((select id from products where slug = 'lasiana-chunky-tote-bag'), 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1200&q=80', 1),
  ((select id from products where slug = 'timor-sun-hat'), 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=1200&q=80', 1),
  ((select id from products where slug = 'flobamora-macrame-coaster-set'), 'https://images.unsplash.com/photo-1584589167171-541ce45f1eea?auto=format&fit=crop&w=1200&q=80', 1);
