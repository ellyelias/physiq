# PhysiQ by Cikgu Suhaili

Aplikasi latihan STPM Fizik Semester 1 — bank soalan, nota ringkas setiap topik, dan instrumen kajian tindakan (ujian pra/pos).

## Setup pangkalan data (sekali sahaja)

Keputusan ujian pra/pos pelajar disegerakkan merentasi peranti melalui Google Sheets (percuma). Lihat arahan penuh dalam `Code.gs`:

1. Buka Google Sheet baharu.
2. Extensions → Apps Script.
3. Salin-tampal kandungan `Code.gs` ke dalam editor.
4. Deploy → New deployment → Web app → Execute as: Me → Who has access: Anyone.
5. Salin URL Web app (berakhir dengan `/exec`).
6. Letakkan URL itu pada baris `GAS_WEBAPP_URL` dalam `index.html` (gantikan `PASTE_WEBAPP_URL_HERE`), commit, dan GitHub Pages akan kemas kini secara automatik.

Sebelum langkah ini selesai, aplikasi tetap berfungsi sepenuhnya (bank soalan, nota, latihan) — hanya dashboard guru yang akan memaparkan data peranti semasa sahaja sehingga backend disambungkan.

## PIN Dashboard Guru

PIN lalai: `2026` (tukar dalam `index.html`, cari `TEACHER_PIN`).
