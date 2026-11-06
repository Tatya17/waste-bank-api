# Waste Bank RESTful API (Sistem Bank Sampah)

Layanan RESTful API backend berbasis **Node.js** dan **Express.js** untuk mengelola data kategori sampah pada aplikasi Bank Sampah Digital.

## Teknologi yang Digunakan
- **Runtime:** Node.js
- **Framework:** Express.js (ES Modules)
- **Database:** PostgreSQL (`Database_BankSampah.sql`)
- **API Testing:** Postman
- **Version Control:** Git & GitHub

## Endpoint API (`/api/kategori`)

| Method | Endpoint | Deskripsi | Status Code |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/kategori` | Menambahkan data kategori sampah baru | `201 Created` |
| `GET` | `/api/kategori` | Mengambil seluruh data kategori sampah | `200 OK` |
| `GET` | `/api/kategori/:id` | Mengambil data kategori sampah berdasarkan ID | `200 OK` |
| `PUT` | `/api/kategori/:id` | Mengubah/update data kategori sampah berdasarkan ID | `200 OK` |
| `DELETE` | `/api/kategori/:id` | Menghapus data kategori sampah berdasarkan ID | `200 OK` |

---

## Catatan Repositori

- **`node_modules/`**  
  Folder `node_modules` sengaja **tidak disertakan** dalam repositori ini untuk menjaga ukuran repositori tetap ringan dan sesuai standar *best practice* pengembangan perangkat lunak. Seluruh dependensi dapat diunduh dan diinstal kembali secara otomatis dengan menjalankan perintah `npm install`.

- **File `.gitignore`**  
  File ini idealnya mengonfigurasi pengabaian untuk folder **`node_modules/`** (dependensi eksternal) dan file **`.env`** (kredensial/variabel lingkungan sensitif). Pada repositori ini, pengabaian berkas-berkas tersebut telah dilakukan secara manual saat proses *upload*, sehingga repositori tetap aman, bersih, dan terstruktur.

## Struktur Proyek

```text
waste-bank-api/
├── Database_BankSampah.sql   # File skema database SQL bank sampah
├── server.js                 # Entry point & kode utama RESTful API Express
├── package.json              # Manajer dependensi proyek Node.js
├── package-lock.json         # Catatan versi spesifik dependensi
└── README.md                 # Dokumentasi utama proyek

