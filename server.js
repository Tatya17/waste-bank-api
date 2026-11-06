import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

// middleware (Sesuai dokumentasi expressjs.com)
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// data dummy (sesuai tabel kategori_sampah)
let kategoriSampah = [
  { id: 1, nama_kategori: 'Plastik', deskripsi: 'Botol, kemasan, dan gelas plastik' },
  { id: 2, nama_kategori: 'Kertas', deskripsi: 'Kardus, koran, dan kertas HVS' },
  { id: 3, nama_kategori: 'Logam', deskripsi: 'Kaleng minuman dan besi bekas' }
];

// root route
app.get('/', (req, res) => {
  res.send('API Bank Sampah Digital Berjalan!');
});

// REST API ROUTES: /api/kategori

// 1. GET ALL: dapatkan semua data kategori
app.get('/api/kategori', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Berhasil mengambil semua data kategori sampah',
    data: kategoriSampah,
  });
});

// 2. GET BY ID: dapatkan data kategori berdasarkan ID
app.get('/api/kategori/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const kategori = kategoriSampah.find(item => item.id === id);

  if (!kategori) {
    return res.status(404).json({
      status: 'fail',
      message: `Data kategori dengan ID ${id} tidak ditemukan`,
    });
  }

  res.status(200).json({
    status: 'success',
    message: `Berhasil mengambil data kategori ID ${id}`,
    data: kategori,
  });
});

// 3. POST: membuat data kategori baru
app.post('/api/kategori', (req, res) => {
  const { nama_kategori, deskripsi } = req.body;

  if (!nama_kategori) {
    return res.status(400).json({
      status: 'fail',
      message: 'Nama kategori wajib diisi',
    });
  }

  const newId = kategoriSampah.length > 0 ? kategoriSampah[kategoriSampah.length - 1].id + 1 : 1;
  const newKategori = { id: newId, nama_kategori, deskripsi: deskripsi || '' };

  kategoriSampah.push(newKategori);

  res.status(201).json({
    status: 'success',
    message: 'Berhasil menambah kategori sampah baru',
    data: newKategori,
  });
});

// 4. PUT: memperbarui data kategori berdasarkan ID
app.put('/api/kategori/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { nama_kategori, deskripsi } = req.body;

  const index = kategoriSampah.findIndex(item => item.id === id);

  if (index === -1) {
    return res.status(404).json({
      status: 'fail',
      message: `Data kategori dengan ID ${id} tidak ditemukan`,
    });
  }

  kategoriSampah[index] = {
    id,
    nama_kategori: nama_kategori || kategoriSampah[index].nama_kategori,
    deskripsi: deskripsi !== undefined ? deskripsi : kategoriSampah[index].deskripsi,
  };

  res.status(200).json({
    status: 'success',
    message: `Berhasil memperbarui data kategori ID ${id}`,
    data: kategoriSampah[index],
  });
});

// 5. DELETE: menghapus data kategori berdasarkan ID
app.delete('/api/kategori/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const index = kategoriSampah.findIndex(item => item.id === id);

  if (index === -1) {
    return res.status(404).json({
      status: 'fail',
      message: `Data kategori dengan ID ${id} tidak ditemukan`,
    });
  }

  const deletedItem = kategoriSampah.splice(index, 1);

  res.status(200).json({
    status: 'success',
    message: `Berhasil menghapus kategori ID ${id}`,
    data: deletedItem[0],
  });
});

// menjalankan Server Express
app.listen(PORT, () => {
  console.log(`Server Express berjalan di http://localhost:${PORT}`);
});