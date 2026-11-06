-- 1. Tabel Utama: pengguna
CREATE TABLE pengguna (
    id SERIAL PRIMARY KEY,
    nama_pengguna VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    kata_sandi VARCHAR(255) NOT NULL,
    peran VARCHAR(20) DEFAULT 'WARGA', -- 'WARGA' atau 'PETUGAS'
    dibuat_pada TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Tabel Detail Profil Warga (Relasi 1:1 dengan pengguna)
CREATE TABLE profil_pengguna (
    id SERIAL PRIMARY KEY,
    pengguna_id INT UNIQUE NOT NULL,
    nama_lengkap VARCHAR(100) NOT NULL,
    nik VARCHAR(16) UNIQUE NOT NULL,
    nomor_telepon VARCHAR(15),
    rt VARCHAR(5) NOT NULL,
    rw VARCHAR(5) NOT NULL,
    alamat TEXT,
    total_poin INT DEFAULT 0,
    FOREIGN KEY (pengguna_id) REFERENCES pengguna(id) ON DELETE CASCADE
);

-- 3. Tabel Kategori Sampah
CREATE TABLE kategori_sampah (
    id SERIAL PRIMARY KEY,
    nama_kategori VARCHAR(50) NOT NULL,
    deskripsi TEXT
);

-- 4. Tabel Jenis Sampah (Relasi 1:N dari kategori_sampah)
CREATE TABLE jenis_sampah (
    id SERIAL PRIMARY KEY,
    kategori_id INT NOT NULL,
    nama_jenis VARCHAR(100) NOT NULL,
    poin_per_kg INT NOT NULL,
    satuan VARCHAR(10) DEFAULT 'KG',
    FOREIGN KEY (kategori_id) REFERENCES kategori_sampah(id) ON DELETE CASCADE
);

-- 5. Tabel Setoran Sampah (Relasi 1:N dari pengguna dan jenis_sampah)
CREATE TABLE setoran_sampah (
    id SERIAL PRIMARY KEY,
    pengguna_id INT NOT NULL,
    jenis_sampah_id INT NOT NULL,
    berat_kg NUMERIC(5,2) NOT NULL,
    poin_diperoleh INT NOT NULL,
    tanggal_setor TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (pengguna_id) REFERENCES pengguna(id) ON DELETE CASCADE,
    FOREIGN KEY (jenis_sampah_id) REFERENCES jenis_sampah(id) ON DELETE CASCADE
);

-- 6. Tabel Hadiah
CREATE TABLE hadiah (
    id SERIAL PRIMARY KEY,
    nama_hadiah VARCHAR(100) NOT NULL,
    poin_dibutuhkan INT NOT NULL,
    stok INT NOT NULL DEFAULT 0,
    deskripsi TEXT
);

-- 7. Tabel Penukaran Hadiah (Tabel Penghubung Relasi N:M antara pengguna dan hadiah)
CREATE TABLE penukaran_hadiah (
    id SERIAL PRIMARY KEY,
    pengguna_id INT NOT NULL,
    hadiah_id INT NOT NULL,
    poin_digunakan INT NOT NULL,
    tanggal_tukar TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT 'PENDING', -- 'PENDING', 'DISETUJUI', 'DITOLAK'
    FOREIGN KEY (pengguna_id) REFERENCES pengguna(id) ON DELETE CASCADE,
    FOREIGN KEY (hadiah_id) REFERENCES hadiah(id) ON DELETE CASCADE
);