# Color Palette Resmi — Pascasarjana IAI Persis Bandung

Palet warna earth-tone bernuansa forest dan sage green yang digunakan pada antarmuka website Program Pascasarjana (Magister S2) Institut Agama Islam Persatuan Islam (IAI Persis) Bandung.

| Swatch | Name | HEX | RGB | Tailwind Class | Penggunaan Utama |
| :---: | :--- | :---: | :---: | :--- | :--- |
| ![#344E41](https://via.placeholder.com/20/344E41/344E41.png) | **Darkest Forest** | `#344E41` | `rgb(52, 78, 65)` | `bg-pasca-darkest`, `text-pasca-darkest` | Background gelap, header, footer |
| ![#3A5A40](https://via.placeholder.com/20/3A5A40/3A5A40.png) | **Hunter Green** | `#3A5A40` | `rgb(58, 90, 64)` | `bg-pasca-dark`, `text-pasca-dark` | Hover states, aksen kontras |
| ![#588157](https://via.placeholder.com/20/588157/588157.png) | **Fern Primary** | `#588157` | `rgb(88, 129, 87)` | `bg-pasca-primary`, `text-pasca-primary` | Tombol CTA utama, link aktif |
| ![#A3B18A](https://via.placeholder.com/20/A3B18A/A3B18A.png) | **Sage Green** | `#A3B18A` | `rgb(163, 177, 138)` | `bg-pasca-sage`, `text-pasca-sage` | Border, badge, tags, divider |
| ![#DAD7CD](https://via.placeholder.com/20/DAD7CD/DAD7CD.png) | **Warm Cream / Light** | `#DAD7CD` | `rgb(218, 215, 205)` | `bg-pasca-light`, `text-pasca-light` | Background kartu, background netral |

### Cara Menggunakan di Tailwind:
```jsx
// Background & teks
<div className="bg-pasca-darkest text-white p-6">
    <span className="text-pasca-sage uppercase font-bold text-xs">Program Pascasarjana</span>
    <h2 className="text-2xl font-bold">Magister S2 IAI Persis Bandung</h2>
    <button className="bg-pasca-primary hover:bg-pasca-dark text-white px-4 py-2 rounded-sm">
        Daftar Sekarang
    </button>
</div>
```

### Cara Menggunakan di CSS / Inline:
```css
var(--pasca-darkest)
var(--pasca-dark)
var(--pasca-primary)
var(--pasca-sage)
var(--pasca-light)
```
