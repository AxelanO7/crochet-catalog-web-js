const steps = [
  {
    title: '1. Login Admin',
    gif: '/guide/login.gif',
    desc: 'Masuk ke /admin/login pakai email & password admin, lalu klik Login.',
  },
  {
    title: '2. Tambah Produk Baru',
    gif: '/guide/add.gif',
    desc: 'Di halaman Produk, klik "+ Tambah Produk". Isi slug, kategori, nama (ID & EN), deskripsi, harga, status, lalu upload foto. Klik "Simpan Produk".',
  },
  {
    title: '3. Edit Produk',
    gif: '/guide/edit.gif',
    desc: 'Klik "Edit" pada produk di daftar, ubah data yang perlu (misal harga atau stok), lalu simpan.',
  },
  {
    title: '4. Nonaktifkan Produk (bukan hapus permanen)',
    gif: '/guide/delete.gif',
    desc: 'Klik "Nonaktifkan" untuk menyembunyikan produk dari katalog publik tanpa menghapus datanya. Bisa "Aktifkan" lagi kapan saja.',
  },
];

export default function GuidePage() {
  return (
    <div className="flex flex-col gap-10 max-w-3xl">
      <div>
        <h1 className="font-display text-2xl text-on-surface mb-1">Panduan Kelola Produk</h1>
        <p className="text-sm text-on-surface-variant">
          Langkah-langkah dasar mengelola katalog Rianne Collective lewat halaman admin ini.
        </p>
      </div>

      {steps.map((s) => (
        <div key={s.title} className="border border-outline-variant/40 rounded-lg overflow-hidden bg-surface-container-lowest">
          <div className="p-4 border-b border-outline-variant/30">
            <h2 className="font-medium text-on-surface">{s.title}</h2>
            <p className="text-sm text-on-surface-variant mt-1">{s.desc}</p>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={s.gif} alt={s.title} className="w-full block" />
        </div>
      ))}
    </div>
  );
}
