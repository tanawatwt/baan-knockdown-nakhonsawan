// Partials: shared header, footer, top-bar, floating buttons, mobile CTA
(function(){
  const page = document.body.dataset.page || '';
  const base = document.body.dataset.base || ''; // e.g. "../" for nested pages
  const isActive = (p) => p === page ? ' class="active"' : '';
  const u = (p) => base + p;

  const topBar = `<div class="top-bar"><div class="container">
    <div class="left"><span>📍 ต.ยางตาล อ.โกรกพระ จ.นครสวรรค์ 60170</span><span>🕒 เปิดทุกวัน 08:00–17:00 น.</span></div>
    <div class="right"><a href="tel:+66972592502">📞 097-259-2502</a><a href="https://line.me/R/ti/p/@baannockdown" target="_blank" rel="noopener">LINE: @baannockdown</a></div>
  </div></div>`;

  const header = `<header class="site"><div class="container nav">
    <a href="${u('index.html')}" class="brand"><img src="${u('assets/logo-header.png')}" alt="โลโก้ เรื่องบ้านบ้านน็อคดาวน์ นครสวรรค์" /></a>
    <nav class="nav-links">
      <a href="${u('index.html')}"${isActive('home')}>หน้าแรก</a>
      <a href="${u('services.html')}"${isActive('services')}>บริการ</a>
      <a href="${u('models.html')}"${isActive('models')}>แบบบ้าน &amp; ราคา</a>
      <a href="${u('portfolio.html')}"${isActive('portfolio')}>ผลงาน</a>
      <a href="${u('process.html')}"${isActive('process')}>ขั้นตอน</a>
      <a href="${u('about.html')}"${isActive('about')}>เกี่ยวกับเรา</a>
      <a href="${u('blog.html')}"${isActive('blog')}>บทความ</a>
      <a href="${u('contact.html')}"${isActive('contact')}>ติดต่อ</a>
    </nav>
    <div class="nav-cta">
      <a href="tel:+66972592502" class="btn btn-ghost">โทรเลย</a>
      <a href="${u('contact.html')}" class="btn btn-primary">ขอใบเสนอราคา</a>
      <button class="hamburger" onclick="document.querySelector('.nav-links').classList.toggle('open')"><span></span><span></span><span></span></button>
    </div>
  </div></header>`;

  const footer = `<footer class="site"><div class="container">
    <div class="foot-grid">
      <div>
        <div class="foot-brand"><img src="${u('assets/logo-circle.png')}" alt="โลโก้" /><div><strong>เรื่องบ้านบ้านน็อคดาวน์</strong><span>บ้านน็อคดาวน์ นครสวรรค์</span></div></div>
        <p style="line-height:1.7;color:#bfd2c5">รับออกแบบ ผลิต และติดตั้งบ้านน็อคดาวน์ครบวงจร โครงสร้างเหล็กกันสนิม สร้างเสร็จไว ราคาคุ้มค่า ปรับแบบได้ตามงบ</p>
      </div>
      <div><h5>เมนูหลัก</h5><a href="${u('index.html')}">หน้าแรก</a><a href="${u('services.html')}">บริการ</a><a href="${u('models.html')}">แบบบ้าน &amp; ราคา</a><a href="${u('portfolio.html')}">ผลงาน</a><a href="${u('process.html')}">ขั้นตอน</a><a href="${u('about.html')}">เกี่ยวกับเรา</a><a href="${u('blog.html')}">บทความ</a><a href="${u('contact.html')}">ติดต่อเรา</a></div>
      <div><h5>พื้นที่ให้บริการ</h5><a href="${u('contact.html')}">บ้านน็อคดาวน์ นครสวรรค์</a><a href="${u('contact.html')}">บ้านน็อคดาวน์ กำแพงเพชร</a><a href="${u('contact.html')}">บ้านน็อคดาวน์ ชัยนาท</a><a href="${u('contact.html')}">บ้านน็อคดาวน์ พิษณุโลก</a><a href="${u('contact.html')}">บ้านน็อคดาวน์ อุทัยธานี</a><a href="${u('contact.html')}">บ้านน็อคดาวน์ โกรกพระ</a></div>
      <div><h5>ติดต่อเรา</h5><a href="tel:+66972592502">📞 097-259-2502</a><a href="tel:+66641294121">📞 064-129-4121</a><a href="https://line.me/R/ti/p/@baannockdown">💬 LINE: @baannockdown</a><a href="mailto:baannockdown.ns@gmail.com">✉ baannockdown.ns@gmail.com</a><span style="display:block;padding:5px 0">📍 ต.ยางตาล อ.โกรกพระ<br/>จ.นครสวรรค์ 60170</span><span style="display:block;padding:5px 0">🕒 ทุกวัน 08:00 – 17:00 น.</span></div>
    </div>
    <div class="foot-bottom"><span>© 2026 เรื่องบ้านบ้านน็อคดาวน์ นครสวรรค์ · สงวนลิขสิทธิ์</span><span>บ้านน็อคดาวน์ นครสวรรค์ · รับสร้างบ้านน็อคดาวน์ · บ้านสำเร็จรูป</span></div>
  </div></footer>`;

  const floats = `<div class="float-btns">
    <a href="tel:+66972592502" class="call" aria-label="โทรเลย"><svg fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg></a>
    <a href="https://line.me/R/ti/p/@baannockdown" class="line" aria-label="LINE"><svg fill="currentColor" viewBox="0 0 24 24"><path d="M19.36 8.28a7.36 7.36 0 1 0-2.46 5.5L19 16.5l-.74-2.18a7.31 7.31 0 0 0 1.1-6.04zM8.34 13.07H6.93V8.6h.94v3.55h1.47zm1.32 0h-.94V8.6h.94zm3.99 0h-.94l-1.94-2.6v2.6h-.94V8.6h.94l1.94 2.61V8.6h.94zm3.13-3.55h-1.5v.84h1.5v.94h-1.5v.84h1.5v.94h-2.44V8.6h2.44z"/></svg></a>
    <a href="https://facebook.com" class="fb" aria-label="Facebook"><svg fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/></svg></a>
  </div>
  <div class="mobile-cta">
    <a href="tel:+66972592502" class="call">📞 โทรเลย</a>
    <a href="https://line.me/R/ti/p/@baannockdown" class="line">💬 LINE</a>
    <a href="${u('contact.html')}" class="quote">ใบเสนอราคา</a>
  </div>`;

  document.body.insertAdjacentHTML('afterbegin', topBar + header);
  const fcta = `<section style="padding:40px 0 90px"><div class="container"><div class="fcta">
    <h2>สนใจสร้างบ้านน็อคดาวน์? เริ่มต้นปรึกษาฟรีวันนี้</h2>
    <p>ส่งแบบหรือพื้นที่หน้างานให้ทีมงานประเมินราคาเบื้องต้นได้ฟรี ไม่มีค่าใช้จ่าย</p>
    <div class="fcta-btns">
      <a href="tel:+66972592502" class="btn btn-yellow btn-lg">📞 โทรเลย 097-259-2502</a>
      <a href="https://line.me/R/ti/p/@baannockdown" class="btn btn-light btn-lg">💬 แอด LINE @baannockdown</a>
      <a href="${u('contact.html')}" class="btn btn-ghost btn-lg" style="color:#fff;border-color:rgba(255,255,255,.4)">ขอใบเสนอราคา</a>
    </div>
  </div></div></section>`;
  if (!document.body.hasAttribute('data-no-fcta')) {
    document.body.insertAdjacentHTML('beforeend', fcta);
  }
  document.body.insertAdjacentHTML('beforeend', footer + floats);

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.style.opacity = 1; e.target.style.transform = 'translateY(0)'; } });
  }, {threshold: .12});
  document.querySelectorAll('section, .trust, .page-head').forEach(el => {
    el.style.opacity = 0; el.style.transform = 'translateY(16px)';
    el.style.transition = 'opacity .6s ease, transform .6s ease';
    io.observe(el);
  });
  document.addEventListener('click', e => {
    if (e.target.closest('.nav-links a')) document.querySelector('.nav-links').classList.remove('open');
  });
})();
