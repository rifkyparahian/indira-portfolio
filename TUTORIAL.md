# 📘 TUTORIAL END-TO-END — Portfolio Indira Rayna

Website portfolio **Indira Rayna — Kids Graphic Designer & Model** yang dibangun ulang
dari HTML statis menjadi **Astro + Tailwind CSS + Decap CMS**.

---

## 1. Teknologi yang Dipakai (dan kenapa)

| Teknologi | Peran | Kenapa dipilih |
|---|---|---|
| **Astro 5** | Framework website | Output statis (super cepat), struktur komponen rapi, konten dari file Markdown/JSON |
| **Tailwind CSS 3** | Styling | Semua class desain neo-brutalist asli dipertahankan 1:1 |
| **Decap CMS** | Dashboard admin | Gratis, berbasis git — edit konten tanpa menyentuh kode, tanpa database/server |
| **Three.js + SortableJS** | 3D & drag-and-drop | Di-*bundle* via npm, tidak lagi dari CDN (lebih cepat & offline-friendly) |

**Alur kerja keseluruhan:**
```
Edit konten (CMS / file)  →  Commit ke GitHub  →  Netlify build otomatis  →  Website live
```

---

## 2. Struktur Folder

```
indira-portfolio/
├── public/
│   ├── admin/               ← Dashboard CMS (Decap)
│   │   ├── index.html
│   │   └── config.yml       ← Konfigurasi form CMS
│   └── images/              ← Semua gambar website
│       ├── hero-indira.png
│       ├── design-01.jpeg … design-12.jpeg   (kartu puzzle)
│       └── look-01.jpeg … look-04.jpeg       (foto compcard/lookbook)
├── src/
│   ├── components/          ← Potongan UI (Navbar, Hero, Portfolio, dll)
│   ├── content/
│   │   ├── designs/         ← 12 file .md kartu design (bisa diedit CMS)
│   │   ├── looks/           ← 4 file .md foto look
│   │   └── settings/site.json ← Judul, hero, marquee, statistik, kontak
│   ├── layouts/Layout.astro ← Kerangka HTML utama
│   ├── pages/index.astro    ← Halaman utama (merangkai semua komponen)
│   ├── scripts/             ← three.ts (3D) & interactions.ts (drag/tab)
│   ├── styles/global.css    ← CSS kustom (brutal-card, marquee, dll)
│   └── content.config.ts    ← Skema (schema) data konten
├── astro.config.mjs
├── tailwind.config.mjs      ← Daftar warna yang boleh dipilih dari CMS (safelist)
└── package.json
```

---

## 3. Menjalankan di Komputer Sendiri (Local Development)

> Prasyarat: **Node.js 18+** (sudah terpasang di Mac kamu).

```bash
cd ~/Projects/indira-portfolio

# 1) Install semua dependency (sekali saja)
npm install

# 2) Jalankan server development
npm run dev
```

Buka **http://localhost:4321** — website tampil dengan hot-reload
(setiap perubahan file langsung terlihat tanpa refresh manual).

Untuk **build produksi** (versi final yang siap di-upload):
```bash
npm run build      # hasilnya di folder dist/
npm run preview    # lihat hasil build di http://localhost:4321
```

---

## 4. Menggunakan CMS (Decap)

### 4a. Mode Lokal (tanpa login, offline)

Buka **2 terminal**:

```bash
# Terminal 1 — jalankan backend CMS lokal
cd ~/Projects/indira-portfolio
npm run cms          # decap-server di port 8081

# Terminal 2 — server website
npm run dev
```

Lalu buka **http://localhost:4321/admin/index.html** — dashboard CMS muncul.
Semua perubahan langsung tersimpan ke file Markdown/JSON di project kamu
(perubahan terbaca oleh git sebagai commit biasa).

### 4b. Mode Online (via Netlify — setelah deploy, lihat bagian 6)

Buka **https://namasitus.netlify.app/admin** lalu login (akun email apa saja
yang kamu undang via Netlify Identity).

### Yang bisa diedit dari CMS

| Menu CMS | Isi | Contoh |
|---|---|---|
| 🎨 **Kartu Design (Puzzle)** | 12 kartu puzzle + gambar + warna | Judul, foto, nomor #01–#12, warna kartu/badge |
| 📸 **Foto Look** | 4 foto compcard & lookbook | Foto, judul (Street Casual dll), rotasi, posisi di papan |
| ⚙️ **Pengaturan Website** | Judul, hero, marquee, statistik, kontak | Email, link Instagram, teks banner berjalan |

**Cara upload gambar baru:** di form CMS, klik field *Gambar* → pilih/upload file
→ otomatis tersimpan ke `public/images/` dan path-nya diisi sendiri.

> ⚠️ **Penting soal warna:** pilihan warna di CMS sudah dibatasi (dropdown)
> supaya selalu ikut ter-*build*. Kalau ingin warna baru di luar daftar,
> tambahkan nama class-nya ke `safelist` di `tailwind.config.mjs`, lalu `npm run build`.

---

## 5. Cara Edit Cepat Tanpa CMS (langsung file)

Semua konten adalah file teks biasa — boleh diedit manual:

- **Ganti judul / email / marquee** → `src/content/settings/site.json`
- **Ganti nama atau warna kartu puzzle** → `src/content/designs/design-01.md` (dst)
- **Ganti foto** → timpa file di `public/images/` (nama file sama = langsung ke-ganti)

Contoh isi `design-01.md`:
```markdown
---
title: "Chiaow! Cowboy"
tag: "#01"
alt: "Ilustrasi Chiaow Cowboy"
image: "/images/design-01.jpeg"
cardBg: "bg-[#FFF8E7]"
badgeBg: "bg-pink-100"
---
```

---

## 6. Deploy ke Internet (End-to-End)

### Langkah A — Upload ke GitHub

```bash
cd ~/Projects/indira-portfolio
# (repo sudah di-init git oleh asisten — commit pertama sudah ada)

# Buat repo baru di github.com (tanpa README/license),
# lalu hubungkan:
git remote add origin https://github.com/NAMAKAMU/indira-portfolio.git
git push -u origin main
```

### Langkah B — Deploy ke Netlify (gratis)

1. Buka **app.netlify.com** → *Add new site* → **Import an existing project**.
2. Pilih repo `indira-portfolio` dari GitHub.
3. Setelan build (sudah otomatis terdeteksi):
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Klik **Deploy site** — tunggu ~1 menit, website live di `https://xxx.netlify.app`.

### Langkah C — Aktifkan Login CMS (Identity + Git Gateway)

1. Di dashboard Netlify situs kamu → **Site settings → Identity** → **Enable Identity**.
2. Di bagian *Registration*, pilih **Invite only** (paling aman).
3. Klik **Invite users** → undang email kamu sendiri (mis. email utama kamu).
4. **Site settings → Identity → Services** → klik **Enable Git Gateway**.
5. Buka `https://xxx.netlify.app/admin` → buat password untuk akun yang diundang → masuk.

Sekarang kamu bisa edit website dari HP/laptop mana pun lewat browser! 🌍

### Alternatif deploy: Vercel
Import repo yang sama → framework otomatis terdeteksi `Astro`.
Catatan: untuk login CMS di Vercel perlu GitHub OAuth App (lebih ribet) — **Netlify direkomendasikan** untuk CMS ini.

---

## 7. Troubleshooting

| Masalah | Solusi |
|---|---|
| `npm install` memunculkan peringatan *install scripts* (npm 11) | Jalankan `npm install-scripts approve esbuild sharp` lalu `npm rebuild esbuild` |
| `/admin` 404 saat dev lokal | Gunakan path lengkap: `http://localhost:4321/admin/index.html` (di Netlify `/admin/` otomatis jalan) |
| Warna dari CMS tidak muncul di hasil build | Warna harus dari dropdown CMS (semua sudah di-*safelist*). Warna baru → tambah ke `tailwind.config.mjs` |
| Foto tidak muncul setelah deploy | Pastikan path di CMS diawali `/images/...` dan file benar-benar ada di `public/images/` |
| Perubahan CMS tidak tampil | Pastikan perubahan sudah di-*commit* (CMS Netlify otomatis commit saat klik *Publish*) |
| Ingin ganti email kontak | `src/content/settings/site.json` → `contact.email` (atau lewat CMS → Pengaturan) |

---

## 8. Fitur Interaktif yang Dipertahankan

- 🎲 **3D Dodecahedron** (Three.js) — berputar otomatis + mengikuti gerakan mouse
- 🧩 **Puzzle 12 kartu** (SortableJS) — bisa digeser & ditukar posisi, termasuk di HP
- 📌 **Compcard pinboard** — 4 polaroid + sticky note bisa di-drag bebas, selalu naik ke lapisan teratas
- ✨ **Sticker melayang** — "drag me anywhere!" (khusus desktop)
- 🎞️ **Marquee banner** — berjalan tanpa henti
- 🔀 **Tab switcher** — Kids Design ⇄ Modeling Compcard

---

*Dibuat dengan ❤️ — Rifky Parahian (via Hermes Agent)*
