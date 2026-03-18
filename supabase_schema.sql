-- 1. Create the `products` table
CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  category TEXT,
  status TEXT CHECK (status IN ('READY STOCK', 'PRE-ORDER')),
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- 3. Allow public read access to products
CREATE POLICY "Allow public select on products" 
ON products FOR SELECT 
TO public 
USING (true);

-- 4. Create public storage bucket `product-images`
INSERT INTO storage.buckets (id, name, public) 
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

-- 5. Set RLS for public read on the `product-images` bucket
CREATE POLICY "Allow public read on product images" 
ON storage.objects FOR SELECT 
TO public 
USING (bucket_id = 'product-images');
