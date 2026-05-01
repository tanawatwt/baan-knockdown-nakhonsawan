# เว็บไซต์ เรื่องบ้านบ้านน็อคดาวน์ นครสวรรค์

**Live URL:** TBD — deploy via [DEPLOYMENT.md](./DEPLOYMENT.md)
**Production domain:** TBD

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

## การปรับปรุงประสิทธิภาพในอนาคต

### คะแนน Lighthouse ที่คาดหวัง

เมื่อรัน Lighthouse บน local preview server (`npm run preview`) คะแนน Performance จะอยู่ในช่วง **71–86** เนื่องจากเซิร์ฟเวอร์ local ไม่มี CDN, HTTP/2 หรือ Edge caching เมื่อ deploy บน **Cloudflare Pages** คะแนนจะสูงขึ้นอย่างมีนัยสำคัญ เพราะ Cloudflare CDN ส่งไฟล์จาก Edge node ที่ใกล้กับผู้ใช้ และบีบอัด assets ให้โดยอัตโนมัติ

### โอกาสปรับปรุงที่แนะนำ (ทำหลัง launch)

#### 1. ปรับภาพเป็น WebP/AVIF (ประหยัด ~940 KB)

ปัจจุบันรูปภาพใน `public/photos/` เป็นไฟล์ JPEG ทั้งหมด การย้ายรูปมาไว้ใน `src/assets/photos/` และใช้ component `<Image>` ของ Astro จะทำให้ระบบสร้าง WebP และ AVIF ให้อัตโนมัติพร้อม lazy-loading ที่ถูกต้อง ส่งผลให้ขนาดหน้าเว็บลดลงประมาณ 940 KB และ LCP (Largest Contentful Paint) เร็วขึ้น แนะนำให้ทำหลังจาก site ขึ้น production แล้วและเนื้อหาภาพนิ่งแล้ว

**วิธีคร่าวๆ:**
1. ย้ายไฟล์รูปจาก `public/photos/` → `src/assets/photos/`
2. แทนที่ `<img src="...">` หรือ `<img>` ด้วย `<Image src={import('...')} alt="..." />` จาก `astro:assets`
3. รัน `npm run build` แล้วตรวจสอบขนาด `dist/`

#### 2. Self-host Google Fonts (ประหยัด ~860 ms cold-start)

ปัจจุบัน Google Fonts โหลดจาก `fonts.googleapis.com` ซึ่งเพิ่ม DNS lookup + TLS handshake ในการโหลดครั้งแรก การ self-host font ไว้ใน `public/fonts/` และอ้างอิงผ่าน `@font-face` ใน CSS จะลดเวลานี้ได้ประมาณ 860 ms บน connection ช้า อย่างไรก็ตาม เนื่องจากน้ำหนักหน้าเว็บโดยรวมยังเบาอยู่ การปรับข้อนี้จึงไม่ urgent — แนะนำให้ทำหลังจากทำ image optimization เสร็จแล้ว
