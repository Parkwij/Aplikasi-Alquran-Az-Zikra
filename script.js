// =============================
// Az-Zikra - script.js (Lengkap)
// =============================
//
// - Al-Qur'an via equran.id
// - Asmaul Husna (99 nama)
// - Doa Harian (~30 doa)
// - Quotes Islami (~40 quotes)
// - Jadwal Sholat (Aladhan API) untuk Tangerang (lat=-6.17806, lon=106.63)
// - Navigasi & inisialisasi
//
// NOTE: Jika API Aladhan atau equran.id berubah, sesuaikan endpoint.
// =============================

// -----------------------------
// ELEMENT REFERENCES (harus ada di index.html)
// -----------------------------
const surahSelect = document.getElementById("surahSelect");
const ayatContainer = document.getElementById("ayatContainer");
const asmaulContainer = document.getElementById("asmaulContainer");
const doaContainer = document.getElementById("doaContainer");
const quotesContainer = document.getElementById("quotesContainer");
const jadwalContainer = document.getElementById("jadwalContainer");

// -----------------------------
// NAVIGASI SECTION
// -----------------------------
function showSection(sectionId) {
  document.querySelectorAll(".content").forEach(sec => sec.style.display = "none");
  const target = document.getElementById(sectionId);
  if (target) target.style.display = "block";
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// -----------------------------
// AL-QUR'AN (equran.id)
// -----------------------------
async function loadSurahList() {
  try {
    surahSelect.innerHTML = '<option value="">Pilih Surah...</option>';
    const res = await fetch("https://equran.id/api/v2/surat");
    const json = await res.json();
    json.data.forEach(surah => {
      const opt = document.createElement("option");
      opt.value = surah.nomor;
      opt.textContent = `${surah.nomor}. ${surah.namaLatin}`;
      surahSelect.appendChild(opt);
    });
  } catch (err) {
    surahSelect.innerHTML = '<option value="">Gagal memuat daftar surah</option>';
    console.error("Error loadSurahList:", err);
  }
}

async function loadAyat(nomorSurah) {
  if (!nomorSurah) return;
  ayatContainer.innerHTML = "<p>Memuat ayat...</p>";
  try {
    const res = await fetch(`https://equran.id/api/v2/surat/${nomorSurah}`);
    const json = await res.json();
    ayatContainer.innerHTML = "";
    json.data.ayat.forEach(ayat => {
      const div = document.createElement("div");
      div.className = "ayat";
      div.innerHTML = `
        <div class="arabic">${ayat.teksArab}</div>
        <div class="latin">${ayat.teksLatin}</div>
        <div class="translation">${ayat.teksIndonesia}</div>
      `;
      ayatContainer.appendChild(div);
    });
  } catch (err) {
    ayatContainer.innerHTML = "<p>Gagal memuat ayat.</p>";
    console.error("Error loadAyat:", err);
  }
}

surahSelect && surahSelect.addEventListener("change", () => loadAyat(surahSelect.value));

// -----------------------------
// ASMAUL HUSNA (99 NAMA)
// -----------------------------
const asmaulHusna = [
  { index:1, arab:"الرَّحْمَنُ", latin:"Ar-Rahman", meaning:"Maha Pengasih" },
  { index:2, arab:"الرَّحِيمُ", latin:"Ar-Rahim", meaning:"Maha Penyayang" },
  { index:3, arab:"الْمَلِكُ", latin:"Al-Malik", meaning:"Zat yang Memiliki Kerajaan" },
  { index:4, arab:"الْقُدُّوسُ", latin:"Al-Quddus", meaning:"Maha Suci" },
  { index:5, arab:"السَّلَامُ", latin:"As-Salam", meaning:"Pemberi Kesejahteraan" },
  { index:6, arab:"الْمُؤْمِنُ", latin:"Al-Mu'min", meaning:"Pemberi Keamanan" },
  { index:7, arab:"الْمُهَيْمِنُ", latin:"Al-Muhaymin", meaning:"Maha Memelihara" },
  { index:8, arab:"الْعَزِيزُ", latin:"Al-Aziz", meaning:"Maha Perkasa" },
  { index:9, arab:"الْجَبَّارُ", latin:"Al-Jabbar", meaning:"Maha Memaksa" },
  { index:10, arab:"الْمُتَكَبِّرُ", latin:"Al-Mutakabbir", meaning:"Maha Megah" },
  { index:11, arab:"الْخَالِقُ", latin:"Al-Khaliq", meaning:"Maha Pencipta" },
  { index:12, arab:"الْبَارِئُ", latin:"Al-Bari'", meaning:"Maha Membentuk" },
  { index:13, arab:"الْمُصَوِّرُ", latin:"Al-Musawwir", meaning:"Pemberi Bentuk" },
  { index:14, arab:"الْغَفَّارُ", latin:"Al-Ghaffar", meaning:"Maha Pengampun" },
  { index:15, arab:"الْقَهَّارُ", latin:"Al-Qahhar", meaning:"Maha Menundukkan" },
  { index:16, arab:"الْوَهَّابُ", latin:"Al-Wahhab", meaning:"Pemberi Karunia" },
  { index:17, arab:"الرَّزَّاقُ", latin:"Ar-Razzaq", meaning:"Maha Pemberi Rezeki" },
  { index:18, arab:"الْفَتَّاحُ", latin:"Al-Fattah", meaning:"Maha Pembuka" },
  { index:19, arab:"الْعَلِيمُ", latin:"Al-Alim", meaning:"Maha Mengetahui" },
  { index:20, arab:"الْقَابِضُ", latin:"Al-Qabid", meaning:"Maha Menyempitkan" },
  { index:21, arab:"الْبَاسِطُ", latin:"Al-Basit", meaning:"Maha Melapangkan" },
  { index:22, arab:"الْخَافِضُ", latin:"Al-Khafid", meaning:"Maha Merendahkan" },
  { index:23, arab:"الرَّافِعُ", latin:"Ar-Rafi'", meaning:"Maha Mengangkat" },
  { index:24, arab:"الْمُعِزُّ", latin:"Al-Mu'izz", meaning:"Pemberi Kemuliaan" },
  { index:25, arab:"الْمُذِلُّ", latin:"Al-Mudhill", meaning:"Pemberi Kehinaan" },
  { index:26, arab:"السَّمِيعُ", latin:"As-Sami'", meaning:"Maha Mendengar" },
  { index:27, arab:"الْبَصِيرُ", latin:"Al-Basir", meaning:"Maha Melihat" },
  { index:28, arab:"الْحَكَمُ", latin:"Al-Hakam", meaning:"Maha Menentukan" },
  { index:29, arab:"الْعَدْلُ", latin:"Al-Adl", meaning:"Maha Adil" },
  { index:30, arab:"اللَّطِيفُ", latin:"Al-Latif", meaning:"Maha Lembut" },
  { index:31, arab:"الْخَبِيرُ", latin:"Al-Khabir", meaning:"Maha Mengetahui" },
  { index:32, arab:"الْحَلِيمُ", latin:"Al-Halim", meaning:"Maha Penyantun" },
  { index:33, arab:"الْعَظِيمُ", latin:"Al-Azim", meaning:"Maha Agung" },
  { index:34, arab:"الْغَفُورُ", latin:"Al-Ghafur", meaning:"Maha Pengampun" },
  { index:35, arab:"الشَّكُورُ", latin:"As-Syakur", meaning:"Maha Mensyukuri" },
  { index:36, arab:"الْعَلِيُّ", latin:"Al-Aliyy", meaning:"Maha Tinggi" },
  { index:37, arab:"الْكَبِيرُ", latin:"Al-Kabir", meaning:"Maha Besar" },
  { index:38, arab:"الْحَفِيظُ", latin:"Al-Hafiz", meaning:"Maha Memelihara" },
  { index:39, arab:"الْمُقِيتُ", latin:"Al-Muqiit", meaning:"Maha Pemberi Kecukupan" },
  { index:40, arab:"الْحَسِيبُ", latin:"Al-Hasib", meaning:"Maha Penghisab" },
  { index:41, arab:"الجَلِيلُ", latin:"Al-Jalil", meaning:"Maha Mulia" },
  { index:42, arab:"الْكَرِيمُ", latin:"Al-Karim", meaning:"Maha Pemurah" },
  { index:43, arab:"الرَّقِيبُ", latin:"Ar-Raqib", meaning:"Maha Mengawasi" },
  { index:44, arab:"الْمُجِيبُ", latin:"Al-Mujib", meaning:"Maha Mengabulkan" },
  { index:45, arab:"الْوَاسِعُ", latin:"Al-Wasi'", meaning:"Maha Luas" },
  { index:46, arab:"الْحَكِيمُ", latin:"Al-Hakim", meaning:"Maha Bijaksana" },
  { index:47, arab:"الْوَدُودُ", latin:"Al-Wadud", meaning:"Maha Pengasih" },
  { index:48, arab:"الْمَجِيدُ", latin:"Al-Majid", meaning:"Maha Mulia" },
  { index:49, arab:"الْبَاعِثُ", latin:"Al-Ba'ith", meaning:"Maha Membangkitkan" },
  { index:50, arab:"الشَّهِيدُ", latin:"As-Syahid", meaning:"Maha Menyaksikan" },
  { index:51, arab:"الْحَقُّ", latin:"Al-Haqq", meaning:"Maha Benar" },
  { index:52, arab:"الْوَكِيلُ", latin:"Al-Wakil", meaning:"Maha Memelihara (Perwakilan)" },
  { index:53, arab:"الْقَوِيُّ", latin:"Al-Qawiyy", meaning:"Maha Kuat" },
  { index:54, arab:"الْمَتِينُ", latin:"Al-Matin", meaning:"Maha Kokoh" },
  { index:55, arab:"الْوَلِيُّ", latin:"Al-Waliyy", meaning:"Maha Pelindung" },
  { index:56, arab:"الْحَمِيدُ", latin:"Al-Hamid", meaning:"Maha Terpuji" },
  { index:57, arab:"الْمُحْصِي", latin:"Al-Muhsi", meaning:"Maha Menghitung" },
  { index:58, arab:"الْمُبْدِئُ", latin:"Al-Mubdi'", meaning:"Maha Memulai" },
  { index:59, arab:"الْمُعِيدُ", latin:"Al-Mu'id", meaning:"Maha Mengembalikan" },
  { index:60, arab:"الْمُحْيِي", latin:"Al-Muhyi", meaning:"Maha Menghidupkan" },
  { index:61, arab:"الْمُمِيتُ", latin:"Al-Mumit", meaning:"Maha Mematikan" },
  { index:62, arab:"الْحَيُّ", latin:"Al-Hayy", meaning:"Maha Hidup" },
  { index:63, arab:"الْقَيُّومُ", latin:"Al-Qayyum", meaning:"Maha Berdiri Sendiri" },
  { index:64, arab:"الْوَاجِدُ", latin:"Al-Wajid", meaning:"Maha Menemukan" },
  { index:65, arab:"الْمَاجِدُ", latin:"Al-Majid", meaning:"Maha Mulia" },
  { index:66, arab:"الْواحِدُ", latin:"Al-Wahid", meaning:"Maha Esa" },
  { index:67, arab:"الأَحَدُ", latin:"Al-Ahad", meaning:"Yang Maha Esa" },
  { index:68, arab:"الصَّمَدُ", latin:"As-Samad", meaning:"Tempat Mengadu" },
  { index:69, arab:"الْقَادِرُ", latin:"Al-Qadir", meaning:"Maha Berkuasa" },
  { index:70, arab:"الْمُقْتَدِرُ", latin:"Al-Muqtadir", meaning:"Maha Menentukan Kekuatan" },
  { index:71, arab:"الْمُقَدِّمُ", latin:"Al-Muqaddim", meaning:"Maha Mendahulukan" },
  { index:72, arab:"الْمُؤَخِّرُ", latin:"Al-Mu'akhkhir", meaning:"Maha Mengakhirkan" },
  { index:73, arab:"الأَوَّلُ", latin:"Al-Awwal", meaning:"Yang Pertama" },
  { index:74, arab:"الْآخِرُ", latin:"Al-Akhir", meaning:"Yang Akhir" },
  { index:75, arab:"الظَّاهِرُ", latin:"Az-Zahir", meaning:"Yang Nyata" },
  { index:76, arab:"الْبَاطِنُ", latin:"Al-Batin", meaning:"Yang Ghaib" },
  { index:77, arab:"الْوَالِي", latin:"Al-Wali", meaning:"Penguasa" },
  { index:78, arab:"الْمُتَعَالِي", latin:"Al-Mutta'ali", meaning:"Maha Tinggi" },
  { index:79, arab:"الْبَرُّ", latin:"Al-Barr", meaning:"Maha Pemberi Kebaikan" },
  { index:80, arab:"التَّوَّابُ", latin:"At-Tawwab", meaning:"Maha Penerima Taubat" },
  { index:81, arab:"الْمُنْتَقِمُ", latin:"Al-Muntaqim", meaning:"Maha Pembalas" },
  { index:82, arab:"العَفُوُّ", latin:"Al-'Afuww", meaning:"Maha Pemaaf" },
  { index:83, arab:"الرَّؤُوفُ", latin:"Ar-Rauf", meaning:"Maha Penyayang" },
  { index:84, arab:"مَالِكُ الْمُلْكِ", latin:"Malik-ul-Mulk", meaning:"Pemilik Kerajaan" },
  { index:85, arab:"ذُو الجَلَالِ وَ الإِكْرَامِ", latin:"Dhul-Jalali wal-Ikram", meaning:"Maha Pemilik Kebesaran dan Kemuliaan" },
  { index:86, arab:"الْمُقْسِطُ", latin:"Al-Muqsit", meaning:"Maha Pembagi Keadilan" },
  { index:87, arab:"الْجَامِعُ", latin:"Al-Jami'", meaning:"Maha Mengumpulkan" },
  { index:88, arab:"الْغَنِيُّ", latin:"Al-Ghaniyy", meaning:"Maha Kaya" },
  { index:89, arab:"الْمُغْنِي", latin:"Al-Mughni", meaning:"Maha Pemberi Kekayaan" },
  { index:90, arab:"الْمَانِعُ", latin:"Al-Mani'", meaning:"Maha Penolak" },
  { index:91, arab:"الضَّارَّ", latin:"Ad-Darr", meaning:"Maha Pemberi Bahaya" },
  { index:92, arab:"النَّافِعُ", latin:"An-Nafi'", meaning:"Maha Memberi Manfaat" },
  { index:93, arab:"النُّورُ", latin:"An-Nur", meaning:"Maha Cahaya" },
  { index:94, arab:"الهادي", latin:"Al-Hadi", meaning:"Maha Pemberi Petunjuk" },
  { index:95, arab:"الْبَدِيعُ", latin:"Al-Badi'", meaning:"Maha Pencipta Tanpa Contoh" },
  { index:96, arab:"الْبَاقِي", latin:"Al-Baqi", meaning:"Maha Kekal" },
  { index:97, arab:"الْوَارِثُ", latin:"Al-Warith", meaning:"Maha Pewaris" },
  { index:98, arab:"الرَّشِيدُ", latin:"Ar-Rashid", meaning:"Maha Pemberi Petunjuk" },
  { index:99, arab:"الصَّبُورُ", latin:"As-Sabur", meaning:"Maha Penyabar" }
];

function loadAsmaulHusna() {
  asmaulContainer.innerHTML = "";
  asmaulHusna.forEach(item => {
    const d = document.createElement("div");
    d.className = "ayat";
    d.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center">
        <div style="font-weight:bold">${item.index}. ${item.latin}</div>
        <div class="arabic" style="font-size:22px">${item.arab}</div>
      </div>
      <div class="translation">${item.meaning}</div>
    `;
    asmaulContainer.appendChild(d);
  });
}

// -----------------------------
// DOA HARIAN (lengkap ~30 doa populer)
// -----------------------------
const doaHarian = [
  { judul:"Doa Ketika Bangun Tidur", arab:"الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا", arti:"Segala puji bagi Allah yang menghidupkan kita setelah mematikan (tidur)" },
  { judul:"Doa Sebelum Makan", arab:"بِسْمِ اللهِ", arti:"Dengan nama Allah" },
  { judul:"Doa Sesudah Makan", arab:"الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا", arti:"Segala puji bagi Allah yang telah memberi makan kita" },
  { judul:"Doa Masuk Rumah", arab:"اللَّهُمَّ اسْکِنْنِي فِیهِ", arti:"Ya Allah, tempatkanlah aku (di rumah ini) dengan berkah" },
  { judul:"Doa Keluar Rumah", arab:"بِسْمِ اللهِ تَوَكَّلتُ عَلَى اللهِ", arti:"Dengan nama Allah, aku bertawakkal kepada Allah" },
  { judul:"Doa Masuk Masjid", arab:"اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ", arti:"Ya Allah, bukakanlah untukku pintu-pintu rahmatMu" },
  { judul:"Doa Sebelum Tidur", arab:"بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا", arti:"Dengan namaMu ya Allah aku mati dan hidup" },
  { judul:"Doa Memulai Pekerjaan", arab:"اللَّهُمَّ إِنِّي أَسْأَلُكَ خَيْرَهَا", arti:"Ya Allah aku memohon kebaikan dari pekerjaanku ini" },
  { judul:"Doa Ketika Hendak Bepergian", arab:"سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا", arti:"Maha suci Allah yang telah menundukkan ini untuk kita" },
  { judul:"Doa Naik Kendaraan", arab:"سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا", arti:"Maha suci yang telah memudahkan kendaraan ini bagi kita" },
  { judul:"Doa Memohon Kesembuhan", arab:"اللَّهُمَّ اشْفِ", arti:"Ya Allah, sembuhkanlah" },
  { judul:"Doa Memohon Rezeki", arab:"اللَّهُمَّ اِنِّي اَسْاَلُكَ رِزْقًا طَيِّبًا", arti:"Ya Allah aku memohon rezeki yang baik" },
  { judul:"Doa Menghadapi Ujian", arab:"رَبِّ اشْرَحْ لِي صَدْرِي", arti:"Ya Tuhanku lapangkanlah dadaku" },
  { judul:"Doa Memohon Petunjuk", arab:"اللَّهُمَّ اهْدِنِي", arti:"Ya Allah, berilah aku petunjuk" },
  { judul:"Doa Saat Cemas", arab:"حَسْبِيَ اللهُ", arti:"Cukuplah Allah bagiku" },
  { judul:"Doa Memohon Ampunan", arab:"رَبِّ اغْفِرْ لِي", arti:"Ya Tuhanku ampunilah aku" },
  { judul:"Doa Untuk Orang Sakit", arab:"اللَّهُمَّ اَشْفِهِ", arti:"Ya Allah sembuhkanlah dia" },
  { judul:"Doa Untuk Orang Meninggal", arab:"اَللّٰهُمَّ اغْفِرْ لَهُ", arti:"Ya Allah ampunilah dia" },
  { judul:"Doa Sebelum Belajar", arab:"رَّبِّ زِدْنِي عِلْمًا", arti:"Tuhanku, tambahkanlah ilmuku" },
  { judul:"Doa Setelah Wudhu", arab:"أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ", arti:"Aku bersaksi tidak ada ilah selain Allah" },
  { judul:"Doa Memulai Majelis", arab:"اللَّهُمَّ بَارِكْ لَنَا", arti:"Ya Allah berkahilah majelis kami" },
  
  // (lanjutan array doaHarian...)
  { judul:"Doa Memasak/Memulai Makanan", arab:"بِسْمِ اللَّهِ", arti:"Dengan menyebut nama Allah" },
  { judul:"Doa Memohon Kebaikan Dunia & Akhirat", arab:"رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً", arti:"Tuhanku, berikanlah kami kebaikan di dunia dan akhirat" },
  { judul:"Doa Agar Dijauhkan dari Fitnah", arab:"اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ فِتْنَةِ الْقَبْرِ", arti:"Ya Allah, aku berlindung kepadaMu dari fitnah kubur" },
  { judul:"Doa Ketika Masuk Kamar Mandi", arab:"بِسْمِ اللَّهِ", arti:"Dengan nama Allah" },
  { judul:"Doa Keluar Kamar Mandi", arab:"غُفْرَانَكَ", arti:"Aku memohon ampunan-Mu" },
  { judul:"Doa Saat Hujan", arab:"اللَّهُمَّ صَيِّبًا نَافِعًا", arti:"Ya Allah, jadikanlah hujan ini manfaat" },
  { judul:"Doa Pergi ke Pasar", arab:"اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ", arti:"Ya Allah aku memohon dari karuniaMu" },
  { judul:"Doa Saat Melihat Keindahan Alam", arab:"سُبْحَانَ اللَّهِ", arti:"Maha Suci Allah" },
  { judul:"Doa Memohon Kesabaran", arab:"اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ", arti:"Ya Allah, tolong aku untuk mengingat Engkau" },
  { judul:"Doa Memohon Ketenangan Hati", arab:"اللَّهُمَّ إِنِّي أَسْأَلُكَ سَكِينَةً", arti:"Ya Allah aku memohon ketenangan" },
  { judul:"Doa Untuk Orang Tua", arab:"رَبِّ اغْفِرْ لِي وَلِوَالِدَيَّ", arti:"Ya Tuhanku ampunilah aku dan kedua orang tuaku" },
  { judul:"Doa Ketika Tertekan", arab:"لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ", arti:"Tiada daya dan upaya kecuali karena Allah" },
  { judul:"Doa Memohon Perlindungan", arab:"أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ", arti:"Aku berlindung dengan kalimat-kalimat Allah yang sempurna" },
  { judul:"Doa Memohon Ilmu Bermanfaat", arab:"اللَّهُمَّ انْفَعْنِي بِمَا عَلَّمْتَنِي", arti:"Ya Allah, manfaatkanlah ilmu yang Engkau ajarkan padaku" },
  { judul:"Doa Meminta Keselamatan Perjalanan", arab:"اللَّهُ أَكْبَرُ", arti:"(doa singkat permintaan keselamatan)"},
  { judul:"Doa Memohon Kebaikan Anak", arab:"رَبِّ هَبْ لِي مِنَ الصَّالِحِينَ", arti:"Tuhanku, karuniakanlah padaku dari anak-anak yang saleh" },
  { judul:"Doa Memohon Keberkahan Usaha", arab:"اللَّهُمَّ بَارِكْ لِي فِي رِزْقِي", arti:"Ya Allah, berkahilah rezekiku" },
  { judul:"Doa Penutup (Doa Ringkas)", arab:"اللَّهُمَّ اغْفِرْ لَنَا ذُنُوبَنَا", arti:"Ya Allah ampunilah dosa-dosa kami" }
];
// akhir doaHarian array

function loadDoa() {
  doaContainer.innerHTML = "";
  doaHarian.forEach(doa => {
    const div = document.createElement("div");
    div.className = "ayat";
    div.innerHTML = `
      <h3 style="margin:0 0 6px 0">${doa.judul}</h3>
      <div class="arabic" style="font-size:20px">${doa.arab}</div>
      <div class="translation">${doa.arti}</div>
    `;
    doaContainer.appendChild(div);
  });
}

// -----------------------------
// QUOTES (lengkap ~40 quotes)
// -----------------------------
const quotes = [
  "Sebaik-baik manusia adalah yang paling bermanfaat bagi manusia lain. (HR. Ahmad)",
  "Janganlah kamu bersedih, sesungguhnya Allah bersama kita. (QS. At-Taubah: 40)",
  "Barang siapa bertakwa kepada Allah, niscaya Dia akan memberi jalan keluar. (QS. At-Talaq: 2)",
  "Sesungguhnya bersama kesulitan ada kemudahan. (QS. Al-Insyirah: 6)",
  "Orang yang sabar akan mendapat pahala tanpa hisab.",
  "Ilmu tanpa amal ibarat pohon tanpa buah.",
  "Kebaikan sekecil apapun akan terus mengalir pahalanya jika dilakukan istiqomah.",
  "Bersyukurlah atas hal kecil—itulah jalan menuju kebahagiaan.",
  "Jaga lisanmu, karena lisan bisa menghancurkan atau menyelamatkan.",
  "Berdoa dan berusaha; jangan lupa tawakal setelahnya.",
  "Ketika hatimu remuk, ingatlah Allah semakin dekat padamu.",
  "Hati yang ikhlas akan menerima apapun dengan tenang.",
  "Ampunan Allah lebih luas dari kesalahan manusia.",
  "Tolonglah sesamamu, maka Allah akan menolongmu.",
  "Sedekah tidak mengurangi harta, melainkan menambah berkah.",
  "Belajar adalah investasi abadi untuk akhirat dan dunia.",
  "Jangan menunda taubat, karena hidup itu tidak pasti.",
  "Bersabar adalah kunci dalam menghadapi ujian hidup.",
  "Hidup sederhana, hati lapang.",
  "Keberkahan datang ketika niat lurus dan tindakan benar.",
  "Tawakal bukan berarti tidak berusaha; ia adalah usaha yang diserahkan kepada Allah.",
  "Berbuat kebaikan meski tak ada yang melihat, itulah akhlak mulia.",
  "Hargai waktu sebelum waktumu habis.",
  "Berdoalah kepada Allah dengan penuh harap dan takut.",
  "Ketika engkau memberi maaf, engkau membuka pintu rahmat untuk dirimu sendiri.",
  "Kesalahan adalah guru; ambillah pelajaran, bukan dendam.",
  "Jadikan Al-Qur'an sebagai teman dalam setiap langkah hidup.",
  "Doa adalah senjata orang beriman; gunakanlah setiap hari.",
  "Hidup ini sementara; persiapkan bekal yang abadi.",
  "Mulailah hari dengan Alhamdulillah dan akhiri dengan Alhamdulillah.",
  "Jangan melihat rendah pada kebaikan kecil; semua bermula dari kecil.",
  "Taqwa adalah investasi untuk hari kemudian.",
  "Senyum adalah sedekah yang mudah dilakukan.",
  "Ikhlas adalah kunci diterimanya amal.",
  "Berbuat baik kepada orang tua adalah jalan surga.",
  "Jangan pernah meremehkan shalat berjamaah.",
  "Hidup tanpa ilmu seperti tubuh tanpa nyawa.",
  "Bangun pagi untuk berdoa, itu awal yang diberkati."
];

function loadQuotes() {
  quotesContainer.innerHTML = "";
  quotes.forEach(q => {
    const div = document.createElement("div");
    div.className = "ayat";
    div.innerHTML = `<div class="translation">❝ ${q} ❞</div>`;
    quotesContainer.appendChild(div);
  });
}

// -----------------------------
// JADWAL SHOLAT (Aladhan API dengan fallback MyQuran)
// -----------------------------
async function loadJadwalSholat() {
  const lat = -6.17806;
  const lon = 106.63;
  const method = 2; // default method; ganti sesuai preferensi (komentar: sesuaikan untuk Kemenag jika perlu)
  const timestamp = Math.floor(Date.now() / 1000);

  jadwalContainer.innerHTML = "<p>Memuat jadwal sholat...</p>";

  try {
    // Aladhan endpoint menggunakan timestamp + koordinat
    const url = `https://api.aladhan.com/v1/timings/${timestamp}?latitude=${lat}&longitude=${lon}&method=${method}`;
    const res = await fetch(url);
    const json = await res.json();

    if (json.code === 200 && json.data) {
      const timings = json.data.timings;
      jadwalContainer.innerHTML = `
        <div class="ayat"><strong>Imsak:</strong> ${timings.Imsak}</div>
        <div class="ayat"><strong>Subuh:</strong> ${timings.Fajr}</div>
        <div class="ayat"><strong>Terbit:</strong> ${timings.Sunrise}</div>
        <div class="ayat"><strong>Dzuhur:</strong> ${timings.Dhuhr}</div>
        <div class="ayat"><strong>Ashar:</strong> ${timings.Asr}</div>
        <div class="ayat"><strong>Maghrib:</strong> ${timings.Maghrib}</div>
        <div class="ayat"><strong>Isya:</strong> ${timings.Isha}</div>
      `;
      return;
    } else {
      throw new Error("Aladhan response not ok");
    }
  } catch (err) {
    console.warn("Aladhan failed, trying MyQuran as fallback:", err);
    // fallback ke MyQuran (kode kota Tangerang: 1306 atau 1608 tergantung sumber; sebelumnya gunakan 1306)
    try {
      const today = new Date();
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, "0");
      const dd = String(today.getDate()).padStart(2, "0");
      const myUrl = `https://api.myquran.com/v2/sholat/jadwal/1306/${yyyy}/${mm}/${dd}`;
      const r2 = await fetch(myUrl);
      const j2 = await r2.json();
      if (j2.data && j2.data.jadwal) {
        const j = j2.data.jadwal;
        jadwalContainer.innerHTML = `
          <div class="ayat"><strong>Imsak:</strong> ${j.imsak}</div>
          <div class="ayat"><strong>Subuh:</strong> ${j.subuh}</div>
          <div class="ayat"><strong>Dzuhur:</strong> ${j.dzuhur}</div>
          <div class="ayat"><strong>Ashar:</strong> ${j.ashar}</div>
          <div class="ayat"><strong>Maghrib:</strong> ${j.maghrib}</div>
          <div class="ayat"><strong>Isya:</strong> ${j.isya}</div>
        `;
        return;
      } else {
        throw new Error("MyQuran fallback failed");
      }
    } catch (err2) {
      jadwalContainer.innerHTML = "<p>Gagal memuat jadwal sholat. Periksa koneksi atau coba lagi.</p>";
      console.error("Both Aladhan and MyQuran failed:", err2);
    }
  }
}

// -----------------------------
// INISIALISASI PADA LOAD
// -----------------------------
window.onload = () => {
  // tampilkan tab Al-Qur'an default
  showSection("quran");

  // load data
  loadSurahList();
  loadAsmaulHusna();
  loadDoa();
  loadQuotes();
  loadJadwalSholat();
};