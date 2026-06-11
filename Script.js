// ================================
// SIMKES - Script.js
// Handles all pages functionality
// ================================

// ================================
// UTILITY: Load & Save ke localStorage
// ================================

function getData(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}

function saveData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// ================================
// HALAMAN: DASHBOARD (index.html)
// ================================

function initDashboard() {
  const el = document.getElementById('dashboard-stats');
  if (!el) return;

  const pasien = getData('pendaftaran');
  const total = pasien.length;
  const menunggu = pasien.filter(p => p.status === 'Menunggu').length;
  const selesai = pasien.filter(p => p.status === 'Selesai').length;

  el.innerHTML = `
    <li>Total Pasien: <strong>${total}</strong></li>
    <li>Menunggu Poli: <strong>${menunggu}</strong></li>
    <li>Selesai: <strong>${selesai}</strong></li>
  `;
}

// ================================
// HALAMAN: PENDAFTARAN
// ================================

function initPendaftaran() {
  const tombol = document.getElementById('btn-simpan-pendaftaran');
  if (!tombol) return;

  renderTabelPendaftaran();

  tombol.addEventListener('click', function () {
    const nama = document.getElementById('input-nama-pendaftaran').value.trim();
    const poli = document.getElementById('select-poli').value;

    if (!nama) {
      alert('Nama pasien tidak boleh kosong!');
      return;
    }

    const data = getData('pendaftaran');
    data.push({ nama, poli, status: 'Menunggu' });
    saveData('pendaftaran', data);

    document.getElementById('input-nama-pendaftaran').value = '';
    document.getElementById('select-poli').selectedIndex = 0;

    renderTabelPendaftaran();
  });
}

function renderTabelPendaftaran() {
  const tbody = document.getElementById('tbody-pendaftaran');
  if (!tbody) return;

  const data = getData('pendaftaran');
  tbody.innerHTML = '';

  if (data.length === 0) {
    tbody.innerHTML = '<tr><td colspan="4" style="text-align:center;color:#aaa;">Belum ada data</td></tr>';
    return;
  }

  data.forEach((item, i) => {
    const badgeClass = item.status === 'Selesai' ? 'done' : 'wait';
    tbody.innerHTML += `
      <tr>
        <td>${i + 1}</td>
        <td>${item.nama}</td>
        <td>${item.poli}</td>
        <td><span class="badge ${badgeClass}">${item.status}</span></td>
      </tr>
    `;
  });
}

// ================================
// HALAMAN: PEMERIKSAAN POLI
// ================================

function initPoli() {
  const tombol = document.getElementById('btn-simpan-poli');
  if (!tombol) return;

  renderTabelPoli();

  tombol.addEventListener('click', function () {
    const nama = document.getElementById('input-nama-poli').value.trim();
    const diagnosa = document.getElementById('input-diagnosa').value.trim();
    const tindakan = document.getElementById('input-tindakan').value.trim();

    if (!nama || !diagnosa || !tindakan) {
      alert('Semua field harus diisi!');
      return;
    }

    const data = getData('poli');
    data.push({ nama, diagnosa, tindakan, status: 'Dipanggil' });
    saveData('poli', data);

    // Update status pasien di pendaftaran jadi Selesai
    const pendaftaran = getData('pendaftaran');
    const idx = pendaftaran.findIndex(p => p.nama.toLowerCase() === nama.toLowerCase());
    if (idx !== -1) {
      pendaftaran[idx].status = 'Selesai';
      saveData('pendaftaran', pendaftaran);
    }

    document.getElementById('input-nama-poli').value = '';
    document.getElementById('input-diagnosa').value = '';
    document.getElementById('input-tindakan').value = '';

    renderTabelPoli();
  });
}

function renderTabelPoli() {
  const tbody = document.getElementById('tbody-poli');
  if (!tbody) return;

  const data = getData('poli');
  tbody.innerHTML = '';

  if (data.length === 0) {
    tbody.innerHTML = '<tr><td colspan="4" style="text-align:center;color:#aaa;">Belum ada data</td></tr>';
    return;
  }

  data.forEach((item, i) => {
    tbody.innerHTML += `
      <tr>
        <td>${i + 1}</td>
        <td>${item.nama}</td>
        <td>${item.diagnosa}</td>
        <td>${item.tindakan}</td>
      </tr>
    `;
  });
}

// ================================
// HALAMAN: FARMASI
// ================================

function initFarmasi() {
  const tombol = document.getElementById('btn-simpan-farmasi');
  if (!tombol) return;

  renderTabelFarmasi();

  tombol.addEventListener('click', function () {
    const nama = document.getElementById('input-nama-farmasi').value.trim();
    const obat = document.getElementById('input-obat').value.trim();
    const jumlah = document.getElementById('input-jumlah').value.trim();

    if (!nama || !obat || !jumlah) {
      alert('Semua field harus diisi!');
      return;
    }

    const data = getData('farmasi');
    data.push({ nama, obat, jumlah });
    saveData('farmasi', data);

    document.getElementById('input-nama-farmasi').value = '';
    document.getElementById('input-obat').value = '';
    document.getElementById('input-jumlah').value = '';

    renderTabelFarmasi();
  });
}

function renderTabelFarmasi() {
  const tbody = document.getElementById('tbody-farmasi');
  if (!tbody) return;

  const data = getData('farmasi');
  tbody.innerHTML = '';

  if (data.length === 0) {
    tbody.innerHTML = '<tr><td colspan="3" style="text-align:center;color:#aaa;">Belum ada data</td></tr>';
    return;
  }

  data.forEach(item => {
    tbody.innerHTML += `
      <tr>
        <td>${item.nama}</td>
        <td>${item.obat}</td>
        <td>${item.jumlah}</td>
      </tr>
    `;
  });
}

// ================================
// HALAMAN: KASIR
// ================================

function initKasir() {
  const tombol = document.getElementById('btn-bayar');
  if (!tombol) return;

  renderTabelKasir();

  tombol.addEventListener('click', function () {
    const nama = document.getElementById('input-nama-kasir').value.trim();
    const total = document.getElementById('input-total').value.trim();

    if (!nama || !total) {
      alert('Semua field harus diisi!');
      return;
    }

    const data = getData('kasir');
    data.push({ nama, total, status: 'Lunas' });
    saveData('kasir', data);

    document.getElementById('input-nama-kasir').value = '';
    document.getElementById('input-total').value = '';

    renderTabelKasir();
  });
}

function renderTabelKasir() {
  const tbody = document.getElementById('tbody-kasir');
  if (!tbody) return;

  const data = getData('kasir');
  tbody.innerHTML = '';

  if (data.length === 0) {
    tbody.innerHTML = '<tr><td colspan="3" style="text-align:center;color:#aaa;">Belum ada data</td></tr>';
    return;
  }

  data.forEach(item => {
    tbody.innerHTML += `
      <tr>
        <td>${item.nama}</td>
        <td>Rp ${parseInt(item.total).toLocaleString('id-ID')}</td>
        <td><span class="badge done">${item.status}</span></td>
      </tr>
    `;
  });
}

// ================================
// HALAMAN: RADIOLOGI
// ================================

function initRadiologi() {
  const tombol = document.getElementById('btn-simpan-radiologi');
  if (!tombol) return;

  renderTabelRadiologi();

  tombol.addEventListener('click', function () {
    const nama = document.getElementById('input-nama-radiologi').value.trim();
    const pemeriksaan = document.getElementById('select-radiologi').value;
    const hasil = document.getElementById('input-hasil-radiologi').value.trim();

    if (!nama || !hasil) {
      alert('Semua field harus diisi!');
      return;
    }

    const data = getData('radiologi');
    data.push({ nama, pemeriksaan, hasil });
    saveData('radiologi', data);

    document.getElementById('input-nama-radiologi').value = '';
    document.getElementById('select-radiologi').selectedIndex = 0;
    document.getElementById('input-hasil-radiologi').value = '';

    renderTabelRadiologi();
  });
}

function renderTabelRadiologi() {
  const tbody = document.getElementById('tbody-radiologi');
  if (!tbody) return;

  const data = getData('radiologi');
  tbody.innerHTML = '';

  if (data.length === 0) {
    tbody.innerHTML = '<tr><td colspan="3" style="text-align:center;color:#aaa;">Belum ada data</td></tr>';
    return;
  }

  data.forEach(item => {
    tbody.innerHTML += `
      <tr>
        <td>${item.nama}</td>
        <td>${item.pemeriksaan}</td>
        <td>${item.hasil}</td>
      </tr>
    `;
  });
}

// ================================
// HALAMAN: LABORATORIUM
// ================================

function initLaboratorium() {
  const tombol = document.getElementById('btn-simpan-lab');
  if (!tombol) return;

  renderTabelLab();

  tombol.addEventListener('click', function () {
    const nama = document.getElementById('input-nama-lab').value.trim();
    const pemeriksaan = document.getElementById('select-lab').value;
    const hasil = document.getElementById('input-hasil-lab').value.trim();

    if (!nama || !hasil) {
      alert('Semua field harus diisi!');
      return;
    }

    const data = getData('laboratorium');
    data.push({ nama, pemeriksaan, hasil });
    saveData('laboratorium', data);

    document.getElementById('input-nama-lab').value = '';
    document.getElementById('select-lab').selectedIndex = 0;
    document.getElementById('input-hasil-lab').value = '';

    renderTabelLab();
  });
}

function renderTabelLab() {
  const tbody = document.getElementById('tbody-lab');
  if (!tbody) return;

  const data = getData('laboratorium');
  tbody.innerHTML = '';

  if (data.length === 0) {
    tbody.innerHTML = '<tr><td colspan="3" style="text-align:center;color:#aaa;">Belum ada data</td></tr>';
    return;
  }

  data.forEach(item => {
    tbody.innerHTML += `
      <tr>
        <td>${item.nama}</td>
        <td>${item.pemeriksaan}</td>
        <td>${item.hasil}</td>
      </tr>
    `;
  });
}

// ================================
// INIT: Jalankan fungsi sesuai halaman
// ================================

document.addEventListener('DOMContentLoaded', function () {
  initDashboard();
  initPendaftaran();
  initPoli();
  initFarmasi();
  initKasir();
  initRadiologi();
  initLaboratorium();
});