# Portfolio — Rian Ady Saputra

Website portofolio personal bergaya dark mode (hitam, abu-abu gelap, aksen ungu dan biru elektrik). Dibuat dengan HTML5, CSS3, dan Vanilla JavaScript tanpa framework maupun library eksternal, sehingga ringan dan langsung kompatibel dengan GitHub Pages.

## Struktur File

```
portfolio/
├── index.html          # Struktur halaman, konten, dan metadata SEO
├── style.css           # Seluruh styling, token warna, animasi, responsif
├── script.js           # Daftar PROJECTS + navbar, scroll reveal, filter, efek
├── assets/
│   ├── images/         # Foto profil dan gambar preview proyek
│   └── icons/          # Favicon
└── README.md
```

## Menjalankan di Lokal

**Cara paling mudah:** buka `index.html` langsung di browser (klik dua kali).

**Atau dengan server lokal** (lebih mirip kondisi saat online):

```bash
cd portfolio
python3 -m http.server 8000
# buka http://localhost:8000
```

## Yang Perlu Kamu Ganti Sebelum Publish

| Yang diganti | Lokasi |
| --- | --- |
| Email (`your.email@example.com`) | `index.html`, bagian `#contact` (ada 2 tempat: `href` dan teks tombol) |
| Link LinkedIn dan GitHub | `index.html`, bagian `#contact`, atribut `href`. Saat ini masih mengarah ke `linkedin.com` dan `github.com` secara umum |
| Foto profil | Ganti `assets/images/profile-placeholder.svg` dengan fotomu, lalu ubah `src` di 2 tag `<img>` (hero dan About) di `index.html`. Rasio kotak (1:1) paling aman |
| Proyek | Daftar `PROJECTS` di bagian atas `script.js` |
| Judul dan deskripsi SEO | Tag `<title>` dan `<meta name="description">` di `index.html` |

> Semua kartu proyek saat ini adalah **placeholder** dan diberi label "Placeholder". Tidak ada proyek yang diklaim sebagai karyamu.

## Menambah Proyek Baru

Buka `script.js`, tambahkan satu objek baru ke array `PROJECTS`:

```js
{
  title: "Nama Proyek",
  category: "Web Development",          // kategori baru otomatis jadi tombol filter
  description: "Deskripsi singkat 1-2 kalimat.",
  image: "assets/images/nama-proyek.jpg", // rasio 16:10, mis. 1280x800
  alt: "Deskripsi singkat gambar",
  url: "https://link-proyekmu.com",       // kosongkan "" bila belum ada link
  placeholder: false,                     // hapus label Placeholder
},
```

Letakkan gambar preview di `assets/images/`. Jika `url` dikosongkan, tombol "View Project" tampil nonaktif.

## Mengubah Warna

Semua warna ada di bagian `:root` pada `style.css` (variabel `--accent` untuk ungu, `--accent-2` untuk biru elektrik, `--bg` untuk latar).

## Deploy ke GitHub Pages

1. **Buat repository** di GitHub, misalnya `portfolio`. Jika ingin alamat `https://USERNAME.github.io`, beri nama repository `USERNAME.github.io`.
2. **Upload isi folder** agar `index.html` berada di root repository:
   ```bash
   cd portfolio
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/USERNAME/NAMA-REPO.git
   git push -u origin main
   ```
3. Di GitHub buka **Settings → Pages**.
4. Pada **Build and deployment**, pilih **Source: Deploy from a branch**, branch **main**, folder **/ (root)**, lalu **Save**.
5. Tunggu 1 sampai 3 menit. Situs akan aktif di `https://USERNAME.github.io/NAMA-REPO/` (atau `https://USERNAME.github.io/` untuk repository `USERNAME.github.io`).

Semua path di proyek ini bersifat relatif (`assets/...`, `style.css`, `script.js`), jadi aman dipakai di subfolder repository.

### Domain Kustom (opsional)

Di **Settings → Pages → Custom domain**, isi domainmu lalu atur DNS sesuai [dokumentasi GitHub Pages](https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site).

## Peningkatan SEO Setelah Online (opsional)

- Tambahkan `<link rel="canonical" href="URL-situsmu">` di `<head>`.
- Tambahkan tag `og:url` dan `og:image` (gambar JPG/PNG 1200x630 di `assets/images/`) agar tampil rapi saat link dibagikan.
- Tambahkan `robots.txt` dan `sitemap.xml` jika perlu.

## Checklist Sebelum Publish

- [ ] Email sudah diganti
- [ ] Link LinkedIn dan GitHub sudah diarahkan ke profilmu
- [ ] Foto profil sudah diganti
- [ ] Proyek placeholder sudah diganti atau dihapus
- [ ] Judul dan deskripsi SEO sudah disesuaikan
- [ ] Sudah dicek di desktop dan smartphone

## Fitur Singkat

- Navbar tetap terlihat, efek kaca saat scroll, indikator progres scroll, menu mobile
- Smooth scrolling dan penanda menu aktif sesuai section
- Hero dengan visual orbit, chip melayang, dan efek tilt halus (desktop)
- Scroll reveal, efek spotlight pada kartu, filter proyek per kategori
- Semantic HTML, metadata Open Graph, data terstruktur JSON-LD, skip link, dukungan `prefers-reduced-motion`
- Tanpa dependensi eksternal: font memakai font sistem, ikon berupa SVG inline

## Lisensi

Bebas digunakan dan dimodifikasi untuk keperluan pribadi.
