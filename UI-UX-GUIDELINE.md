# UI/UX Guideline: Flat Clean + Bento Grid
**Untuk:** Website kampus / program studi
**Stack:** Tailwind CSS (bisa dipakai di Laravel Blade, Inertia React, dll)
**Tujuan:** Kredibel, cepat dibaca, user friendly, dan tidak kelihatan "AI slop".

---

## 1. Prinsip Inti

1. **Info dulu, dekorasi belakangan.** Calon mahasiswa datang buat cari: akreditasi, kurikulum, biaya, jadwal daftar. Semua desain harus bantu nemu itu dalam < 3 klik.
2. **Satu hal per section.** Satu section = satu pesan. Jangan campur.
3. **Hierarki lewat ukuran & weight, bukan warna-warni.**
4. **Konsisten > kreatif.** Spacing, radius, border dipakai ulang di semua komponen.
5. **Mobile first.** Mayoritas pengunjung dari HP.
6. **Setiap elemen harus punya alasan.** Kalau dihapus tidak ada yang hilang, hapus.

---

## 2. Design Tokens

### 2.1 Warna

Pakai **1 primary** (ambil dari logo kampus) + **1 accent** (opsional, dipakai hemat) + neutral.

| Token | Fungsi | Contoh |
|---|---|---|
| `primary-600` | Tombol utama, link, aksen utama | dari logo |
| `primary-700` | Hover tombol | 1 step lebih gelap |
| `primary-50` | Background section highlight / badge | tint sangat muda |
| `accent-500` | Highlight kecil (angka, badge "Dibuka") | 1 warna, max 5% layar |
| `neutral-950` | Heading | hampir hitam |
| `neutral-700` | Body text | |
| `neutral-500` | Teks sekunder, caption | |
| `neutral-200` | Border | |
| `neutral-50` | Background section selang-seling | |
| `white` | Background utama, background card | |

**Aturan warna:**
- Komposisi: **70% putih/neutral, 20% neutral-50, 8% primary, 2% accent**.
- Kontras teks minimal **4.5:1** (WCAG AA). Cek pakai contrast checker.
- **Dilarang:** gradient ungu-biru, gradient di tombol, neon, lebih dari 2 warna non-neutral.
- Status: success `green-600`, warning `amber-600`, error `red-600`. Hanya untuk feedback, bukan dekorasi.

### 2.2 Tipografi

**1 font family saja.** Rekomendasi: `Plus Jakarta Sans` atau `Inter`. Fallback: `system-ui, sans-serif`.

| Peran | Mobile | Desktop | Weight | Line height | Letter spacing |
|---|---|---|---|---|---|
| Display (hero H1) | 36px | 56px | 700 | 1.1 | -0.02em |
| H2 (judul section) | 28px | 40px | 700 | 1.2 | -0.01em |
| H3 (judul card) | 20px | 24px | 600 | 1.3 | 0 |
| H4 | 18px | 20px | 600 | 1.4 | 0 |
| Body L (lead paragraph) | 18px | 20px | 400 | 1.6 | 0 |
| Body | 16px | 16px | 400 | 1.6 | 0 |
| Small / caption | 14px | 14px | 400 | 1.5 | 0 |
| Overline / label | 12px | 12px | 600 | 1.4 | 0.08em, uppercase |

**Aturan:**
- Body **tidak boleh < 16px** di mobile.
- Lebar baris teks max **65 karakter** (`max-w-prose` / `max-w-2xl`).
- Paragraf rata kiri. **Jangan justify, jangan center** untuk teks > 2 baris.
- Heading maksimal 2 baris di mobile.
- Hanya pakai weight 400, 600, 700. Jangan lebih.

### 2.3 Spacing Scale (basis 4px)

Pakai skala ini saja. Jangan angka random.

| Token | px | Tailwind | Pakai untuk |
|---|---|---|---|
| space-1 | 4 | `1` | Gap icon & teks kecil |
| space-2 | 8 | `2` | Gap antar elemen rapat (badge, label) |
| space-3 | 12 | `3` | Gap label → input |
| space-4 | 16 | `4` | Padding card kecil, gap paragraf |
| space-6 | 24 | `6` | Padding card standar, gap grid mobile |
| space-8 | 32 | `8` | Padding card besar, gap grid desktop |
| space-12 | 48 | `12` | Jarak heading → konten section |
| space-16 | 64 | `16` | Padding section mobile |
| space-24 | 96 | `24` | Padding section desktop |
| space-32 | 128 | `32` | Hero desktop (atas/bawah) |

**Prinsip:** *jarak dalam grup < jarak antar grup.* Elemen yang berhubungan didekatkan, yang tidak berhubungan dijauhkan (proximity).

### 2.4 Radius, Border, Shadow

| Elemen | Radius | Border | Shadow |
|---|---|---|---|
| Button | `rounded-lg` (8px) | none / 1px | none |
| Input | `rounded-lg` (8px) | 1px `neutral-200` | none |
| Card / bento tile | `rounded-2xl` (16px) | 1px `neutral-200` | none |
| Badge | `rounded-full` | none | none |
| Image di card | `rounded-xl` (12px) | none | none |
| Modal / dropdown | `rounded-2xl` | 1px `neutral-200` | `shadow-lg` (satu-satunya yang boleh) |

**Aturan:**
- **Flat = tanpa shadow.** Kedalaman dibuat lewat border 1px dan perbedaan background (`white` vs `neutral-50`).
- Shadow hanya untuk elemen yang *melayang* (dropdown, modal, sticky nav saat scroll).
- Radius **konsisten**: jangan campur 4px, 12px, 24px, 32px di satu halaman. Pakai 8 / 16 / full saja.
- **Dilarang:** glow, colored shadow, glassmorphism di mana-mana, border gradient.

---

## 3. Layout & Grid

### 3.1 Container

```
max-width: 1200px (konten umum)
max-width: 1440px (hero / full-bleed section, opsional)
padding horizontal: 16px (mobile) · 24px (tablet) · 32px (desktop)
```

Tailwind: `mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8`

### 3.2 Grid

| Breakpoint | Kolom | Gap |
|---|---|---|
| < 640px (mobile) | 4 | 16px |
| 640-1023px (tablet) | 8 | 24px |
| ≥ 1024px (desktop) | 12 | 24-32px |

### 3.3 Ritme Section (vertical rhythm)

- Padding section: **`py-16` mobile, `py-24` desktop**.
- Selang-seling background: `white` → `neutral-50` → `white` supaya section kebaca tanpa garis pemisah.
- Heading section → konten: **`mb-12`**.
- Heading + deskripsi: gap `mt-4`, deskripsi `max-w-2xl text-neutral-600`.
- Jangan lebih dari **1 CTA primary per section**.

### 3.4 Urutan Halaman (Home Prodi)

1. Navbar
2. Hero (value prop + CTA daftar)
3. Angka kunci (akreditasi, jumlah mahasiswa, dosen, lulusan bekerja)
4. Keunggulan (**bento**)
5. Kurikulum / konsentrasi
6. Prospek karir / lulusan
7. Dosen
8. Fasilitas (**bento**, foto asli)
9. Alur pendaftaran (stepper) + biaya
10. Berita / kegiatan
11. FAQ
12. CTA penutup
13. Footer

---

## 4. Bento Grid Spec

Bento dipakai **hanya** untuk: keunggulan, fasilitas, statistik, highlight program. **Bukan** untuk seluruh halaman.

### 4.1 Aturan Dasar

- Gap antar tile **seragam**: `gap-4` mobile, `gap-6` desktop.
- Padding tile: `p-6` mobile, `p-8` desktop.
- Radius tile: `rounded-2xl`. Semua tile **sama**.
- Border: `border border-neutral-200`. Tanpa shadow.
- Background tile: `bg-white` (di section `neutral-50`) atau `bg-neutral-50` (di section putih).
- **Maksimal 1 tile berwarna primary** per grid sebagai fokus utama.
- Jumlah tile: **5-7**. Kurang dari 4 = tidak perlu bento. Lebih dari 8 = overload.
- Satu tile = satu ide. Isi: icon/angka/foto + judul + 1-2 kalimat.

### 4.2 Pola Grid Desktop (12 kolom)

**Pola A, 5 tile (keunggulan):**
```
┌───────────────┬───────┬───────┐
│               │   2   │   3   │
│   1 (besar)   ├───────┴───────┤
│   span 6x2    │   4 (span 6)  │
├───────────────┴───────────────┤
│        5 (span 12, strip)     │
└───────────────────────────────┘
```

**Pola B, 6 tile (fasilitas):**
```
┌───────┬───────┬───────────────┐
│   1   │   2   │               │
│ span4 │ span4 │  3 (span 4x2) │
├───────┴───────┤               │
│   4 (span 8)  │               │
├───────┬───────┴───────┬───────┤
│   5   │       6       │  ...  │
└───────┴───────────────┴───────┘
```

Tinggi baris: **`auto-rows-[200px]` (mobile) / `auto-rows-[240px]` (desktop)**. Tile tinggi = kelipatan baris.

### 4.3 Ukuran Tile

| Tipe | Span (desktop) | Isi |
|---|---|---|
| Hero tile | `col-span-6 row-span-2` | Foto besar / pesan utama + CTA |
| Standard | `col-span-3` atau `col-span-4` | Icon + judul + deskripsi |
| Wide | `col-span-6` | Foto + teks horizontal |
| Stat | `col-span-3` | Angka besar + label |
| Strip | `col-span-12` | Logo mitra / CTA |

### 4.4 Responsive Bento

- **Mobile (< 640px):** semua tile `col-span-1`, 1 kolom, urut sesuai prioritas. Tile hero tetap paling atas.
- **Tablet (640-1023px):** 2 kolom, tile hero `col-span-2`.
- **Desktop (≥ 1024px):** pola 12 kolom di atas.
- Pastikan **urutan DOM = urutan prioritas baca** (penting untuk screen reader & mobile).

### 4.5 Isi Tile

- **Judul:** H3, max 5 kata.
- **Deskripsi:** max 2 kalimat (± 20 kata), `text-neutral-600`.
- **Angka (stat):** 48-64px bold + label 14px di bawahnya.
- **Icon:** 1 set konsisten (Lucide / Heroicons outline), 24px, stroke 1.5-2, di dalam kotak `size-12 rounded-xl bg-primary-50 text-primary-600`.
- **Foto:** `object-cover`, rasio konsisten, tanpa overlay gradient berat. Kalau butuh teks di atas foto, pakai overlay solid `bg-black/40`.

### 4.6 Hover (opsional, halus)

- Tile yang bisa diklik: `hover:border-neutral-300 transition-colors duration-150`.
- Tile yang tidak bisa diklik: **tanpa hover effect** (jangan menipu user).
- **Dilarang:** scale besar, tilt 3D, bouncing.

---

## 5. Komponen

### 5.1 Button

| Varian | Style |
|---|---|
| Primary | `bg-primary-600 text-white hover:bg-primary-700` |
| Secondary | `bg-white text-neutral-950 border border-neutral-200 hover:bg-neutral-50` |
| Ghost / link | `text-primary-600 hover:underline` |

**Ukuran:**
| Size | Tinggi | Padding X | Font |
|---|---|---|---|
| md | 44px | 20px | 16px / 600 |
| lg | 52px | 28px | 16px / 600 |

- Tinggi minimal **44px** (touch target).
- Radius `rounded-lg`. Tanpa shadow, tanpa gradient.
- Teks tombol = **kata kerja spesifik**: "Daftar Sekarang", "Lihat Kurikulum", "Unduh Brosur". Bukan "Klik di sini" / "Submit".
- Fokus: `focus-visible:ring-2 ring-primary-600 ring-offset-2`.
- Jarak antar tombol: `gap-3`. Max 2 tombol berdampingan.

### 5.2 Navbar

- Tinggi: **64px mobile, 72px desktop**.
- Background `white`, border bawah `1px neutral-200` (muncul saat scroll).
- Isi: logo kiri, menu tengah/kanan (max **6 item**), 1 CTA primary di kanan ("Daftar").
- Mobile: hamburger → drawer full-height, item menu tinggi 56px.
- Sticky, tapi **jangan makan > 72px**.

### 5.3 Hero

- Padding: `pt-16 pb-16` mobile, `pt-24 pb-24` desktop.
- Layout desktop: 2 kolom (teks 6 / foto 6) atau teks kiri + foto bento kanan.
- Isi berurutan: overline (nama prodi / akreditasi) → H1 (max 10 kata) → lead paragraph (max 2 kalimat) → 2 tombol (primary + secondary) → trust row (akreditasi, jumlah lulusan).
- H1 bicara **manfaat untuk calon mahasiswa**, bukan nama kampus doang.
- Foto: asli kampus/mahasiswa, bukan stock.

### 5.4 Card (non-bento: berita, dosen)

- `rounded-2xl border border-neutral-200 bg-white overflow-hidden`
- Gambar rasio **16:9** (berita), **1:1 atau 4:5** (dosen).
- Body padding `p-6`. Gap internal `space-y-3`.
- Meta (tanggal, kategori) pakai Small, `text-neutral-500`.

### 5.5 Form

- Label **di atas** input, 14px / 600, `mb-2`.
- Input tinggi **48px**, padding X `16px`, font 16px (mencegah zoom iOS).
- Border `neutral-200`, fokus `border-primary-600 ring-2 ring-primary-100`.
- Error: border `red-600` + pesan di bawah input, 14px, `mt-2`, **pakai teks, bukan warna doang**.
- Gap antar field: `space-y-5` (20px).
- Placeholder bukan pengganti label.
- Hint/format di bawah label, bukan di placeholder.
- Submit button full-width di mobile.

### 5.6 Stepper (alur pendaftaran)

- Maksimal 5 langkah.
- Tiap langkah: nomor (`size-10 rounded-full bg-primary-600 text-white`), judul H4, 1 kalimat.
- Desktop: horizontal dengan garis penghubung 1px. Mobile: vertikal.

### 5.7 FAQ / Accordion

- 6-10 pertanyaan. Pertanyaan paling sering dicari paling atas (biaya, syarat, beasiswa).
- Item: padding `py-5`, pembatas `border-b neutral-200`.
- Icon chevron berputar, animasi 150ms.
- Bisa dibuka lewat keyboard (`button`, `aria-expanded`).

### 5.8 Footer

- Background `neutral-950` atau `neutral-50` (pilih satu).
- 4 kolom desktop: identitas + alamat, menu, program, kontak/sosmed.
- Padding `py-16`. Copyright `text-sm`.

---

## 6. UX Rules

### Navigasi & Alur
- User harus nemu **Daftar, Kurikulum, Biaya, Kontak** dalam maksimal 2 klik dari home.
- CTA "Daftar" selalu terlihat (navbar), plus 1 di hero, 1 di penutup.
- Breadcrumb di halaman dalam.
- Link aktif di menu harus jelas (warna primary + underline/indikator).

### Konten
- Pakai bahasa calon mahasiswa, bukan bahasa dokumen akademik.
- Angka konkret > klaim kosong. Bukan "lulusan berkualitas", tapi "87% lulusan bekerja < 6 bulan" (hanya kalau datanya ada dan benar).
- Paragraf max 3-4 baris.
- Pakai bullet untuk daftar syarat/dokumen.
- Foto orang asli + alt text deskriptif.

### Performa
- Gambar: WebP/AVIF, `loading="lazy"` (kecuali hero), set `width` & `height` supaya tidak layout shift.
- Target: LCP < 2.5s, CLS < 0.1.
- Font: max 1 family, 2-3 weight, `font-display: swap`.

### Aksesibilitas (wajib)
- Kontras teks ≥ 4.5:1.
- Semua interaktif bisa diakses keyboard, fokus ring terlihat.
- Touch target ≥ 44×44px.
- Heading berurutan (`h1` → `h2` → `h3`), 1 `h1` per halaman.
- `alt` di semua gambar bermakna; dekoratif pakai `alt=""`.
- Hormati `prefers-reduced-motion`.
- Jangan sampaikan info hanya lewat warna.

### Motion
- Durasi: **150-200ms** untuk hover/fokus, **250-300ms** untuk buka/tutup.
- Easing: `ease-out`.
- Animasi hanya `opacity` dan `transform`.
- Fade-in saat scroll: boleh **sekali**, subtle (translateY 12px), jangan stagger panjang.
- **Dilarang:** parallax berat, animasi looping, floating blob, typing effect di hero.

---

## 7. Anti AI-Slop Checklist

Tanda desain "kelihatan AI banget". **Hindari semuanya:**

| ❌ Slop | ✅ Gantinya |
|---|---|
| Gradient ungu-biru / pink-orange di hero | Warna solid dari brand |
| Blob / orb blur melayang di background | Background polos atau foto asli |
| Semua section center-aligned | Rata kiri, grid jelas |
| Emoji sebagai icon fitur (🚀✨🎓) | Icon set konsisten (Lucide/Heroicons) |
| Card shadow besar + hover scale | Border 1px, hover ganti warna border |
| Heading klise: "Unlock Your Potential", "Revolutionize..." | Heading spesifik: "S1 Informatika Terakreditasi Unggul di Bandung" |
| Teks dummy: "Lorem ipsum", "John Doe", "Company Name" | Konten asli atau placeholder jelas ditandai |
| Stock photo orang tersenyum pakai laptop | Foto asli kampus & mahasiswa |
| 3 kolom card icon identik di setiap section | Variasi layout (bento, list, split) |
| Badge "✨ New", pill berkilau di atas hero | Overline teks sederhana |
| Glassmorphism di semua card | Flat, border tipis |
| Semua tombol gradient + glow | Solid primary, satu saja |
| Counter animasi angka di setiap stat | Angka statis, kecuali 1 momen penting |
| Spacing tidak konsisten (13px, 27px, 41px) | Skala 4/8px |
| Banyak font (display + serif + mono) | 1 family |
| Border radius campur-campur | 8 / 16 / full |
| Dark mode "karena bisa" | Hanya kalau memang ada kebutuhan |
| Testimoni palsu / angka karangan | Data asli atau jangan ditampilkan |

**Tes cepat "slop":**
1. Tutup logo. Apakah halaman ini bisa jadi website startup SaaS mana pun? → Terlalu generik.
2. Apakah ada elemen yang cuma "biar keren"? → Hapus.
3. Apakah user bisa jawab "ini prodi apa, di mana, gimana daftar" dalam 5 detik? → Kalau tidak, perbaiki hierarki.

---

## 8. Tailwind Config

```js
// tailwind.config.js
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  content: ['./resources/**/*.{blade.php,js,jsx,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        // GANTI dengan warna dari logo kampus
        primary: {
          50:  '#eff6ff',
          100: '#dbeafe',
          600: '#1d4ed8',
          700: '#1e40af',
        },
        accent: { 500: '#f59e0b' },
      },
      borderRadius: {
        lg: '8px',
        xl: '12px',
        '2xl': '16px',
      },
      maxWidth: {
        container: '1200px',
      },
    },
  },
}
```

---

## 9. Contoh Kode

### 9.1 Section Wrapper

```html
<section class="bg-neutral-50 py-16 lg:py-24">
  <div class="mx-auto w-full max-w-container px-4 sm:px-6 lg:px-8">
    <div class="mb-12 max-w-2xl">
      <p class="text-xs font-semibold uppercase tracking-[0.08em] text-primary-600">Keunggulan</p>
      <h2 class="mt-3 text-[28px] font-bold leading-tight tracking-tight text-neutral-950 lg:text-[40px]">
        Kenapa kuliah di prodi ini
      </h2>
      <p class="mt-4 text-lg text-neutral-600">
        Kurikulum berbasis industri, dosen praktisi, dan akreditasi yang jelas.
      </p>
    </div>

    <!-- konten -->
  </div>
</section>
```

### 9.2 Bento Grid (Pola A, 5 tile)

```html
<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:auto-rows-[240px] lg:gap-6">

  <!-- 1. Hero tile (satu-satunya yang berwarna primary) -->
  <article class="flex flex-col justify-between rounded-2xl bg-primary-600 p-6 text-white sm:col-span-2 lg:col-span-6 lg:row-span-2 lg:p-8">
    <div>
      <p class="text-xs font-semibold uppercase tracking-[0.08em] text-white/70">Akreditasi</p>
      <h3 class="mt-3 text-2xl font-semibold lg:text-[32px] lg:leading-tight">Terakreditasi Unggul</h3>
      <p class="mt-3 max-w-sm text-white/80">Diakui BAN-PT, lulusan siap kerja dan siap lanjut S2.</p>
    </div>
    <a href="#" class="inline-flex h-11 w-fit items-center rounded-lg bg-white px-5 font-semibold text-primary-700">
      Lihat sertifikat
    </a>
  </article>

  <!-- 2. Standard tile -->
  <article class="rounded-2xl border border-neutral-200 bg-white p-6 lg:col-span-3 lg:p-8">
    <div class="flex size-12 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
      <!-- icon 24px -->
    </div>
    <h3 class="mt-5 text-xl font-semibold text-neutral-950">Dosen Praktisi</h3>
    <p class="mt-2 text-neutral-600">Belajar langsung dari yang bekerja di industri.</p>
  </article>

  <!-- 3. Stat tile -->
  <article class="flex flex-col justify-between rounded-2xl border border-neutral-200 bg-white p-6 lg:col-span-3 lg:p-8">
    <p class="text-5xl font-bold tracking-tight text-neutral-950">87%</p>
    <p class="text-neutral-600">Lulusan bekerja kurang dari 6 bulan</p>
  </article>

  <!-- 4. Wide tile -->
  <article class="rounded-2xl border border-neutral-200 bg-white p-6 sm:col-span-2 lg:col-span-6 lg:p-8">
    <h3 class="text-xl font-semibold text-neutral-950">Lab & Studio Modern</h3>
    <p class="mt-2 max-w-md text-neutral-600">Akses lab komputer dan ruang kolaborasi sepanjang hari kuliah.</p>
  </article>

  <!-- 5. Strip tile -->
  <article class="rounded-2xl border border-neutral-200 bg-white p-6 sm:col-span-2 lg:col-span-12 lg:p-8">
    <p class="text-sm font-semibold text-neutral-500">Mitra industri</p>
    <!-- logo mitra, grayscale, tinggi seragam 32px -->
  </article>

</div>
```

### 9.3 Button

```html
<a href="#daftar"
   class="inline-flex h-11 items-center justify-center rounded-lg bg-primary-600 px-5 font-semibold text-white
          transition-colors duration-150 hover:bg-primary-700
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2">
  Daftar Sekarang
</a>
```

### 9.4 Input

```html
<div>
  <label for="nama" class="mb-2 block text-sm font-semibold text-neutral-950">Nama lengkap</label>
  <input id="nama" type="text"
         class="h-12 w-full rounded-lg border border-neutral-200 bg-white px-4 text-base text-neutral-950
                focus:border-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-100" />
  <p class="mt-2 text-sm text-neutral-500">Sesuai ijazah / KTP.</p>
</div>
```

---

## 10. QA Checklist Sebelum Rilis

**Visual**
- [ ] Hanya 1 font family, 3 weight
- [ ] Spacing semua kelipatan 4px
- [ ] Radius hanya 8 / 16 / full
- [ ] Tidak ada shadow selain dropdown/modal
- [ ] Maksimal 1 tile primary per bento
- [ ] Tidak ada gradient / blob / emoji icon
- [ ] Foto asli, rasio konsisten

**UX**
- [ ] Daftar, kurikulum, biaya, kontak ≤ 2 klik dari home
- [ ] 1 CTA primary per section
- [ ] Teks tombol spesifik
- [ ] Form: label di atas, error jelas, tinggi 48px
- [ ] Urutan baca mobile masuk akal

**Teknis**
- [ ] Kontras ≥ 4.5:1
- [ ] Navigasi keyboard + fokus terlihat
- [ ] Touch target ≥ 44px
- [ ] Gambar lazy + width/height
- [ ] LCP < 2.5s, CLS < 0.1
- [ ] Tes di 360px, 768px, 1280px, 1536px
- [ ] `prefers-reduced-motion` dihormati

**Konten**
- [ ] Tidak ada lorem ipsum / placeholder
- [ ] Semua angka & klaim ada datanya
- [ ] Heading spesifik, bukan klise
