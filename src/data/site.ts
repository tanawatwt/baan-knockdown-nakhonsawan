export const site = {
  name: 'เรื่องบ้านบ้านน็อคดาวน์ นครสวรรค์',
  nameEn: 'Baan Knockdown Nakhon Sawan',
  url: 'https://baannockdown-nakhonsawan.com',
  description:
    'รับสร้างบ้านน็อคดาวน์ครบวงจร ออกแบบ ผลิต ติดตั้งหน้างาน โครงสร้างเหล็กกันสนิม สร้างเสร็จไว 15–45 วัน ราคาเริ่มต้น 39,000 บาท ให้บริการนครสวรรค์ กำแพงเพชร ชัยนาท พิษณุโลก อุทัยธานี',
  phones: ['097-259-2502', '064-092-0412'],
  phonesE164: ['+66972592502', '+66640920412'],
  lineId: '@baannockdown',
  lineUrl: 'https://line.me/R/ti/p/%40baannockdown',
  facebookUrl: 'https://www.facebook.com/baannockdown.ns', // PLACEHOLDER — verify before launch
  messengerUrl: 'https://m.me/baannockdown.ns',            // PLACEHOLDER — verify before launch
  gbpUrl:
    'https://www.google.com/maps/place/%E0%B9%80%E0%B8%A3%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B8%87%E0%B8%9A%E0%B9%89%E0%B8%B2%E0%B8%99%E0%B8%9A%E0%B9%89%E0%B8%B2%E0%B8%99%E0%B8%99%E0%B9%87%E0%B8%AD%E0%B8%84%E0%B8%94%E0%B8%B2%E0%B8%A7%E0%B8%99%E0%B9%8C/@15.6033605,100.1217694,17z',
  email: 'baannockdown.ns@gmail.com',
  address: {
    th: 'ต.ยางตาล อ.โกรกพระ จ.นครสวรรค์ 60170',
    streetTh: 'ต.ยางตาล อ.โกรกพระ',
    en: 'Yang Tan, Krok Phra, Nakhon Sawan 60170',
    locality: 'นครสวรรค์',
    region: 'นครสวรรค์',
    postalCode: '60170',
    country: 'TH',
  },
  geo: { lat: 15.6033605, lng: 100.1217694 },
  hours: 'ทุกวัน 08:00–17:00 น.',
  openingHours: {
    opens: '08:00',
    closes: '17:00',
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] as const,
  },
  serviceAreas: ['นครสวรรค์', 'กำแพงเพชร', 'ชัยนาท', 'พิษณุโลก', 'อุทัยธานี'] as const,
  priceRange: '฿฿',
  founded: '2023',
  startingPriceTHB: 39000,
  buildTimeDaysMin: 15,
  buildTimeDaysMax: 45,
} as const;

export type Site = typeof site;
