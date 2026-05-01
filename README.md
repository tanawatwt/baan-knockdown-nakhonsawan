# เว็บไซต์ เรื่องบ้านบ้านน็อคดาวน์ นครสวรรค์

เว็บไซต์ static แบบ lightweight สร้างด้วย Astro 5 — เน้น Local SEO สำหรับคีย์เวิร์ด **บ้านน็อคดาวน์ นครสวรรค์**

## เริ่มใช้งาน

```bash
npm install
npm run dev      # เปิด http://localhost:4321
npm run build    # สร้างไฟล์ static ใน dist/
npm run preview  # ดูตัวอย่าง production build
npm test         # รัน unit tests
```

## วิธีแก้ไขเนื้อหา

| ต้องการแก้ | แก้ไฟล์ไหน |
|---|---|
| เบอร์โทร / ที่อยู่ / อีเมล / เวลาทำการ | `src/data/site.ts` |
| สีแบรนด์ | `src/styles/site.css` (CSS variables ที่ `:root` ตอนต้นไฟล์) |
| บริการ (6 บริการ) | `src/data/services.ts` |
| แบบบ้าน + ราคา | `src/data/models.ts` |
| ผลงาน / Portfolio | `src/data/portfolio.ts` (เพิ่มรูปใน `public/photos/`) |
| FAQ | `src/data/faq.ts` (อัปเดตทั้งหน้า FAQ และ JSON-LD อัตโนมัติ) |
| โปรโมชั่น | `src/components/Promotion.astro` |

## เพิ่มบทความบล็อกใหม่

สร้างไฟล์ `.md` ใหม่ใน `src/content/blog/` เช่น `my-new-post.md`:

```markdown
---
title: "หัวข้อบทความ (สูงสุด 70 ตัวอักษร)"
description: "คำอธิบายสำหรับ meta description (60–170 ตัวอักษร)"
publishDate: 2026-06-01
heroImage: "/photos/my-image.jpg"
heroImageAlt: "คำอธิบายภาพ มีคีย์เวิร์ด"
category: "คู่มือ"
tags: ["บ้านน็อคดาวน์", "นครสวรรค์"]
---

เนื้อหาบทความที่นี่ ใช้ Markdown ปกติได้
```

ระบบจะสร้างหน้าเว็บอัตโนมัติที่ `/blog/my-new-post`

## Deploy ไปยัง Cloudflare Pages

1. push repo ไปยัง GitHub
2. ที่ Cloudflare Pages → Connect to Git → เลือก repo
3. Build command: `npm run build`
4. Output dir: `dist`
5. Node version: 20
6. ตั้งค่า Environment Variables ใน CF dashboard:
   - `WEB3FORMS_KEY` (จาก https://web3forms.com)
   - `PUBLIC_GTM_ID` (จาก Google Tag Manager)
   - `PUBLIC_SITE_URL` (เช่น `https://baannockdown-nakhonsawan.com`)
7. เพิ่ม custom domain เมื่อพร้อม (CF จัดการ SSL ให้อัตโนมัติ)

หลังจากตั้งค่าแล้ว ทุก `git push` ไปยัง branch `main` จะ rebuild + redeploy อัตโนมัติ

## Local SEO Checklist (ทำนอกเว็บไซต์)

- [ ] เคลม + verify Google Business Profile
- [ ] เพิ่มรูป 10–15 รูปใน GBP
- [ ] เพิ่ม URL เว็บไซต์ในช่อง "Website" ของ GBP
- [ ] ขอ Google reviews จากลูกค้าจริง
- [ ] Submit `https://baannockdown-nakhonsawan.com/sitemap-index.xml` ใน Google Search Console
- [ ] Submit ใน Bing Webmaster Tools
- [ ] เพิ่ม URL เว็บไซต์ในเพจ Facebook + LINE OA

## โครงสร้างโปรเจกต์

(ดู `docs/superpowers/specs/` สำหรับเอกสารออกแบบเต็ม)
