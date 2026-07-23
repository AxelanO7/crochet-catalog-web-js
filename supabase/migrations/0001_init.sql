-- Rianne Collective — initial schema
create extension if not exists "pgcrypto";

create table categories (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name_id text not null,
  name_en text not null,
  order_index int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table products (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  category_id uuid references categories(id) on delete set null,
  name_id text not null,
  name_en text not null,
  desc_id text not null default '',
  desc_en text not null default '',
  price numeric not null default 0,
  status text not null default 'READY STOCK' check (status in ('READY STOCK', 'PRE-ORDER')),
  is_active boolean not null default true,
  order_index int not null default 0,
  created_at timestamptz not null default now()
);

create table product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references products(id) on delete cascade,
  url text not null,
  order_index int not null default 0
);

create table orders (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  customer_note text,
  items jsonb not null,
  subtotal numeric not null default 0,
  payment_method text not null default 'whatsapp',
  payment_status text not null default 'not_applicable',
  status text not null default 'new' check (status in ('new', 'contacted', 'done', 'cancelled')),
  created_at timestamptz not null default now()
);

alter table categories enable row level security;
alter table products enable row level security;
alter table product_images enable row level security;
alter table orders enable row level security;

create policy "public read active categories" on categories
  for select using (is_active = true);
create policy "public read active products" on products
  for select using (is_active = true);
create policy "public read product_images" on product_images
  for select using (
    exists (select 1 from products p where p.id = product_id and p.is_active = true)
  );

create policy "admin full access categories" on categories
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin full access products" on products
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin full access product_images" on product_images
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "public insert orders" on orders
  for insert with check (true);
create policy "admin read orders" on orders
  for select using (auth.role() = 'authenticated');
create policy "admin update orders" on orders
  for update using (auth.role() = 'authenticated');

create index products_category_id_idx on products(category_id);
create index product_images_product_id_idx on product_images(product_id);
