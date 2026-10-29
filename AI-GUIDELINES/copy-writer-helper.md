# Portfolio Copy Harness - Sakha Wibisono
# sakha-dev.indonesiacentral.cloudapp.azure.com
# Version: 2.0 | Updated: 2026-10-30
# Pages complete: 4 of 8 (home, about, experience, contact)

---

## Cara Pakai

File ini adalah single-source harness untuk semua konten teks portfolio Sakha.
Agen membaca file ini dari atas ke bawah, cari page separator `# PAGE: /route`,
kemudian cari section heading `## <SECTION>`, dan ambil teks dalam blok triple
backtick tepat di bawahnya.

### Konvensi Label

| Label | Artinya |
|---|---|
| `# PAGE: /route` | Pembatas antar halaman |
| `## Meta` | title dan description untuk head HTML |
| `## Tagline` | Teks kecil di atas heading utama |
| `## Heading` | Heading utama halaman (h1) |
| `## Sub-copy` | Teks pendek di bawah heading |
| `## Body Copy` | Paragraf narasi utama |
| `## Section: Nama` | Blok konten terpisah dalam halaman |
| `**Label**` | Teks kecil di atas section heading |
| `**Paragraph N**` | Urutan paragraf dalam satu section |
| `**CTA**` | Call-to-action text atau link |
| `**Button**` | Label tombol |
| `**Tech stack tags**` | Tag teknologi untuk experience card |
| `field:` | Nama field form |
| `placeholder:` | Placeholder text di input |
| `required:` | Boolean required/optional |
| `submit_button:` | Teks tombol submit form |

### Tone & Style Rules

Semua copy mengikuti aturan berikut - jangan diubah saat implementasi:
- Tidak ada em-dash (tidak pakai -- atau karakter khusus sejenis)
- Tidak ada karakter beraksent (e, a, i, u - plain ASCII semua)
- Kalimat bervariasi panjang-pendeknya, tidak seragam
- Mix Indo-English yang natural, bukan terjemahan kaku
- Spesifik ke pengalaman nyata Sakha, bukan deskripsi generik

### Status Halaman

| Route | Status |
|---|---|
| / | Ready |
| /about | Ready |
| /experience | Ready |
| /contact | Ready |
| /skills | Pending - perlu daftar tech stack dari Sakha |
| /education | Pending - perlu konfirmasi thesis abstract |
| /certificates | Pending - perlu daftar sertifikat lengkap |
| /projects | Pending - perlu daftar proyek beserta deskripsi |

### Footer - Jangan Diganti

```
(c) 2026 Sakha Wibisono
Made with Astro, Vue & a little patience.
```

---
---

# PAGE: /

---

## Meta

```
title: Sakha Wibisono | Frontend Developer
description: Frontend developer, fresh graduate Informatika Telkom University. Saya bikin interface yang nyambung ke data di baliknya.
```

---

## Tagline

```
Frontend developer · Fresh graduate Informatika Telkom University
```

---

## Hero Heading

```
Hi, I'm Sakha. I build things for the web.
```

---

## Hero Body

```
Mostly interfaces. Kadang backend-nya juga. Saya pernah bikin SSO screen untuk
BUMN, sales dashboard untuk platform fintech, dan academic tools yang dipakai
di dalam Telkom University. Di sela itu semua, saya nulis thesis soal
pemanfaatan generative AI untuk memetakan alur kerja maintenance di data
pembangkit listrik.
```

---

## Section: A Little Context

**Label**
```
A little context
```

**Heading**
```
Learning by building.
```

**Body**
```
Mulai dari D3 Rekayasa Perangkat Lunak, lanjut S1 Informatika di kampus yang
sama. Bukan karena dua gelar terdengar bagus di CV, tapi karena setiap proyek
yang selesai selalu ninggalin pertanyaan baru yang belum bisa saya jawab.
```

**CTA**
```
More about me
```

---

## Section: Most Recently

**Label**
```
Most recently
```

**Heading**
```
Programmer intern at Peruri.
```

**Body**
```
Tiga bulan belajar arti sebenarnya dari "secure authentication" di production.
Astro, Vue, OAuth 2.0, OpenID Connect, dan banyak edge case yang tidak ada
dokumentasinya di mana pun.
```

**CTA**
```
My experience
```

---

## Section: CTA Bottom

**Label**
```
Have something in mind?
```

**Heading**
```
I'd like to hear about it.
```

**Body**
```
Sebuah role, project, atau sekadar pertanyaan soal sesuatu yang ada di sini.
Kirim pesan dan kita bisa mulai dari situ.
```

**Button**
```
Get in touch
```

---
---

# PAGE: /about

---

## Meta

```
title: About | Sakha Wibisono
description: Dari aplikasi rekam medis klinik sampai SSO di BUMN. Begini cara saya belajar membangun software yang dipakai orang sungguhan.
```

---

## Tagline

```
Beyond the resume
```

---

## Heading

```
A little about me.
```

---

## Body Copy - Main Story

**Paragraph 1**
```
Nama saya Sakha. Lulus D3 Rekayasa Perangkat Lunak dari Telkom University
tahun 2024, lanjut langsung ke S1 Informatika di kampus yang sama.
```

**Paragraph 2**
```
Thesis D3 saya adalah MedRecordX, aplikasi rekam medis untuk Klinik Telagasari
Azimat. Secara skala memang kecil, tapi itu pertama kalinya saya harus
membangun sesuatu yang dipakai orang nyata setiap hari kerja. Dari situlah
cara saya mikir soal error handling berubah.
```

**Paragraph 3**
```
Setelah lulus, saya magang di PuTI Telkom University sebagai frontend developer,
bantu pengembangan sistem informasi akademik internal kampus menggunakan
AngularJS. Salah satu bagian yang paling menantang adalah integrasi aplikasi
T-Feeder dengan Neo Feeder PDDIKTI - koordinasi lintas tim backend dan
implementasi sinkronisasi data berbasis API di skala institusi.
```

**Paragraph 4**
```
Kemudian saya ikut kohort Asah Ied by Dicoding. Ini lebih terasa seperti kerja
beneran daripada program pelatihan. Saya jadi lead frontend sekaligus ngurusin
integrasi backend untuk aplikasi lead scoring prediktif konteks perbankan.
Backend-nya pakai Supabase. Saya urus database design, authentication,
authorization, dan koneksi ke ML model. Kami kerja dalam Agile sprint, dan
hampir setiap sprint ada yang melenceng dari rencana. Ternyata dari situlah
paling banyak belajarnya.
```

**Paragraph 5**
```
Paling terakhir, saya magang di Perum Peruri Jakarta. Di sana saya bangun
modul SSO frontend pakai Astro dan Vue.js dengan arsitektur hybrid SSR dan
SPA. Artinya implementasi OAuth 2.0 dan OpenID Connect yang proper: token
exchange, refresh logic, dan semua edge case proteksi akses yang biasanya
dilewatin tutorial. Ini project pertama di mana saya benar-benar merasakan
konsekuensi kalau authentication salah.
```

**Paragraph 6**
```
Thesis S1 saya mengeksplorasi pemanfaatan generative AI untuk process discovery
pada data maintenance operasional perusahaan listrik. Dari pekerjaan itu saya
mulai serius masuk ke data science dan process mining, lebih dalam dari
yang bisa diberikan oleh mata kuliah mana pun.
```

---

## Section: What I'm Working On Now

**Label**
```
What I'm working on now
```

**Heading**
```
Interfaces that don't make people think twice.
```

**Paragraph 1**
```
Responsive layout, reusable component, dan clean API integration adalah
bagian dari web development yang selalu saya kembalikan lagi. Tapi yang
belakangan ini paling banyak menyita perhatian adalah ruang di antara
interface dan data di baliknya. Bagaimana keduanya bicara satu sama lain,
dan apa yang pecah kalau percakapan itu tidak berjalan semestinya.
```

**Paragraph 2**
```
Authentication banyak mengajari saya soal itu. Begitu juga dengan mencoba
membuat language model melakukan sesuatu yang berguna dari log industri yang
tidak terstruktur. Kedua masalah itu kelihatan simpel dari luar, dan menjadi
rumit dengan cepat begitu kamu masuk ke dalamnya.
```

---

## Section: Learning With Other People

**Label**
```
Outside the project work
```

**Heading**
```
Learning with other people.
```

**Paragraph 1**
```
Di Chevalier Lab, saya ikut study group Laravel. Laravel bukan stack utama
saya waktu itu, tapi belajar bareng orang lain dalam setting yang terstruktur
menunjukkan betapa jauh lebih cepat sesuatu nyangkut kalau kamu bisa tanya
langsung dan dengar reasoning orang lain.
```

**Paragraph 2**
```
Di HIMA RPLA, saya masuk di bagian advokasi untuk mahasiswa D3 Rekayasa
Perangkat Lunak Aplikasi. Kerjanya kebanyakan dengerin. Mahasiswa datang
dengan keluhan, dan mencari tahu apa yang sebenarnya mereka butuhkan versus
apa yang mereka minta ternyata adalah skill tersendiri.
```

---

## Education Sidebar

**Entry 1**
```
period: 2024 - 2026
degree: Bachelor of Informatics
institution: Telkom University
gpa: GPA 3.50/4.00
```

**Entry 2**
```
period: 2021 - 2024
degree: Diploma in Software Application Engineering
institution: Telkom University
gpa: GPA 3.67/4.00
```

**CTA**
```
My education
```

---
---

# PAGE: /experience

---

## Meta

```
title: Experience | Sakha Wibisono
description: Tiga internship, satu kohort, dan beberapa hal yang tidak ada di silabus mana pun.
```

---

## Tagline

```
Learning on the job
```

---

## Heading

```
Where I've worked.
```

---

## Sub-copy

```
Tiga internship, satu kohort bootcamp, dan banyak hal yang tidak ada di
silabus mana pun.
```

---

## Entry 1: Perum Peruri

```
role: Programmer Intern
company: Perum Peruri
period: Mar 2026 - Jun 2026
location: Jakarta Selatan, DKI Jakarta
type: Internship
```

**Paragraph 1**
```
Saya masuk dengan pengalaman frontend yang solid. Keluar dengan pemahaman
nyata tentang bagaimana OAuth 2.0 dan OpenID Connect sebenarnya bekerja
ketika sesuatu salah di production.
```

**Paragraph 2**
```
Tugas utama saya adalah membangun modul SSO frontend menggunakan Astro dan
Vue.js dengan arsitektur hybrid SSR dan SPA. Itu berarti implementasi token
exchange, refresh token logic, session management, dan access protection untuk
state expired atau unauthorized. Saya juga bangun reusable UI component yang
jadi andalan sistem untuk konsistensi dan maintainability ke depannya. Ini
pekerjaan paling berpengaruh yang pernah saya kerjakan sampai titik itu.
```

**Tech stack tags**
```
Astro, Vue.js, OAuth 2.0, OpenID Connect, SSR, SPA
```

---

## Entry 2: Asah Ied by Dicoding

```
role: Programmer Apprentice
company: Cohort React & Backend - Asah Ied by Dicoding
period: Aug 2025 - Jan 2026
location: Remote
type: Apprenticeship
```

**Paragraph 1**
```
Kohort ini berjalan lebih seperti tim nyata daripada program pelatihan. Saya
jadi lead di React frontend untuk aplikasi lead scoring prediktif konteks
perbankan, sekaligus ngurusin integrasi backend-nya.
```

**Paragraph 2**
```
Backend pakai Supabase. Saya urus database design, layer authentication dan
authorization, serta koneksi ke ML model yang menjalankan scoring-nya. Kami
kerja dalam Agile sprint. Saya slice desain jadi high-fidelity React dashboard
untuk tampilan sales dan admin, dan nulis dokumentasi teknis yang harus
benar-benar berguna buat orang berikutnya yang menyentuh kode itu.
```

**Tech stack tags**
```
React, Supabase, Machine Learning, Agile, ERD, UI Slicing
```

---

## Entry 3: PuTI Telkom University

```
role: Programmer Intern
company: Direktorat Pusat Teknologi Informasi (PuTI) - Telkom University
period: Feb 2024 - Aug 2024
location: Bandung, Jawa Barat
type: Internship
```

**Paragraph 1**
```
Internship pertama saya, dan yang menunjukkan seberapa beda kode production
dari apa pun yang pernah saya tulis untuk tugas kuliah.
```

**Paragraph 2**
```
Saya bekerja sebagai frontend developer di Direktorat PuTI, kontribusi ke
sistem informasi akademik internal kampus. Pakai AngularJS, saya bangun dan
maintain UI component untuk aplikasi T-Feeder. Saya juga bantu integrasi
T-Feeder dengan Neo Feeder PDDIKTI, yang butuh koordinasi dengan tim backend
dan implementasi sinkronisasi data berbasis API yang jadi tumpuan integrasinya.
```

**Tech stack tags**
```
AngularJS, API Integration, PDDIKTI, Academic Systems
```

---

## Entry 4: Chevalier Lab

```
role: Cohort Web Developer
company: Chevalier Lab
period: Jan 2023 - Jun 2023
location: Bandung, Jawa Barat
type: Organizational / Study Group
```

**Paragraph 1**
```
Study group teknis fokus Laravel. Saya gabung untuk mengisi gap dalam
pemahaman saya soal arsitektur backend.
```

**Paragraph 2**
```
Sesi-sesinya mencakup system design, backend logic, dan database management
lewat studi kasus dan implementasi langsung. Lebih dari teknologinya sendiri,
saya jadi lebih baik dalam belajar bareng kelompok, bertanya yang berguna,
dan menjelaskan reasoning saya ke orang lain.
```

**Tech stack tags**
```
Laravel, PHP, System Architecture, Database Management
```

---
---

# PAGE: /contact

---

## Meta

```
title: Contact | Sakha Wibisono
description: Ada role atau project yang perlu dibicarakan? Atau sekadar penasaran dengan sesuatu yang ada di portfolio ini? Kirim pesan saja.
```

---

## Tagline

```
My inbox is open
```

---

## Heading

```
Let's talk.
```

---

## Sub-copy

```
Ada role yang sedang dibuka, project yang butuh orang, atau pertanyaan soal
sesuatu di portfolio ini? Saya baca semua pesan yang masuk. Kirim saja dan
saya akan balas.
```

---

## Contact Info Block

**Email**
```
label: Email
value: sakhawibisono77@gmail.com
```

**Phone**
```
label: Phone
value: +62 896-1404-0447
```

**LinkedIn**
```
label: Elsewhere
link_text: Connect on LinkedIn
url: https://linkedin.com/in/sakha-wibisono/
```

**Language note**
```
Bahasa Indonesia atau English, dua-duanya oke.
```

---

## Section: Form

**Label**
```
A good place to start
```

**Heading**
```
Ceritakan apa yang sedang kamu kerjakan.
```

**Body**
```
Tidak harus sudah semuanya jelas. Deskripsi singkat soal role atau project
sudah cukup untuk memulai percakapan yang nyata. Saya juga senang cerita
lebih soal pekerjaan saya kalau kamu mau.
```

---

## Form Fields

```
field: Your name
placeholder: Nama kamu
required: true
```

```
field: Email address
placeholder: email@kamu.com
required: true
```

```
field: Subject
placeholder: Ini soal apa?
required: false
```

```
field: Your message
placeholder: Ceritakan sedikit tentang apa yang sedang kamu kerjakan...
required: true
```

```
submit_button: Send message
```
