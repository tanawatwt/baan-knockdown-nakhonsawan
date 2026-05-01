export type PortfolioCategory = 'small' | '1br' | '2br' | 'commercial' | 'site';

export interface PortfolioItem {
  title: string;
  category: PortfolioCategory;
  location: string;
  description?: string;
  images: { src: string; alt: string }[];
}

export const portfolio: PortfolioItem[] = [
  {
    title: 'บ้านน็อคดาวน์ขนาดเล็ก สีเทา',
    category: 'small',
    location: 'อ.โกรกพระ นครสวรรค์',
    description: 'บ้านพักอาศัยขนาดเล็กสำหรับอยู่คนเดียว โครงสร้างเหล็กกันสนิม ผนัง EPS',
    images: [
      { src: '/photos/grey-finished.jpg', alt: 'บ้านน็อคดาวน์ขนาดเล็ก สีเทา สำเร็จรูป นครสวรรค์' },
    ],
  },
  {
    title: 'บ้านน็อคดาวน์สีเขียว ขนาดกะทัดรัด',
    category: 'small',
    location: 'ชัยนาท',
    description: 'บ้านพักชั่วคราวสำหรับคนงานในสวน ติดตั้งเสร็จภายใน 10 วัน',
    images: [
      { src: '/photos/green-house.jpg', alt: 'บ้านน็อคดาวน์สีเขียว ขนาดกะทัดรัด ชัยนาท' },
    ],
  },
  {
    title: 'บ้าน 1 ห้องนอน สีส้ม กลางวัน',
    category: '1br',
    location: 'อ.เมือง นครสวรรค์',
    description: 'บ้านน็อคดาวน์ 1 ห้องนอน 1 ห้องน้ำ พร้อมระเบียง ออกแบบสีส้มโดดเด่น',
    images: [
      { src: '/photos/hero-orange.jpg', alt: 'บ้านน็อคดาวน์ 1 ห้องนอน สีส้ม นครสวรรค์ กลางวัน' },
      { src: '/photos/orange-day.jpg', alt: 'บ้านน็อคดาวน์สีส้ม กลางวัน อ.เมือง นครสวรรค์' },
    ],
  },
  {
    title: 'บ้าน 1 ห้องนอน สีส้ม กลางคืน',
    category: '1br',
    location: 'อ.พยุหะคีรี นครสวรรค์',
    description: 'บ้านน็อคดาวน์พร้อมไฟภายนอก บรรยากาศสวยงามทั้งกลางวันและกลางคืน',
    images: [
      { src: '/photos/orange-night.jpg', alt: 'บ้านน็อคดาวน์สีส้ม กลางคืน อ.พยุหะคีรี นครสวรรค์' },
      { src: '/photos/orange-field.jpg', alt: 'บ้านน็อคดาวน์สีส้ม ในทุ่ง นครสวรรค์' },
    ],
  },
  {
    title: 'บ้าน 1 ห้องนอน สีฟ้า พร้อมอยู่',
    category: '1br',
    location: 'กำแพงเพชร',
    description: 'บ้านน็อคดาวน์สีฟ้า 1 ห้องนอน สำหรับครอบครัวขนาดเล็ก',
    images: [
      { src: '/photos/blue-finished.jpg', alt: 'บ้านน็อคดาวน์ 1 ห้องนอน สีฟ้า พร้อมอยู่ กำแพงเพชร' },
    ],
  },
  {
    title: 'บ้าน 2 ห้องนอน ภายในห้องนอน',
    category: '2br',
    location: 'อุทัยธานี',
    description: 'บ้านน็อคดาวน์ 2 ห้องนอน พร้อมตกแต่งภายใน ห้องนอนกว้างขวาง',
    images: [
      { src: '/photos/interior-1.jpg', alt: 'ภายในบ้านน็อคดาวน์ 2 ห้องนอน ห้องนอน อุทัยธานี' },
      { src: '/photos/interior-2.jpg', alt: 'ภายในบ้านน็อคดาวน์ 2 ห้องนอน ห้องนั่งเล่น อุทัยธานี' },
    ],
  },
  {
    title: 'บ้าน 2 ห้องนอน ตกแต่งครบครัน',
    category: '2br',
    location: 'พิษณุโลก',
    description: 'บ้านน็อคดาวน์ 2 ห้องนอน ตกแต่งครบพร้อมเฟอร์นิเจอร์',
    images: [
      { src: '/photos/interior-3.jpg', alt: 'ภายในบ้านน็อคดาวน์ 2 ห้องนอน ตกแต่งครบครัน พิษณุโลก' },
    ],
  },
  {
    title: 'ร้านค้า / คาเฟ่ สีฟ้า',
    category: 'commercial',
    location: 'อ.เมือง นครสวรรค์',
    description: 'ร้านค้าน็อคดาวน์สีฟ้า สำหรับเปิดคาเฟ่หรือร้านอาหาร ดีไซน์ทันสมัย',
    images: [
      { src: '/photos/blue-install.jpg', alt: 'บ้านน็อคดาวน์ร้านค้าคาเฟ่ สีฟ้า กำลังติดตั้ง นครสวรรค์' },
    ],
  },
  {
    title: 'ระหว่างติดตั้ง — เทโครงพื้น',
    category: 'site',
    location: 'อ.โกรกพระ นครสวรรค์',
    description: 'ขั้นตอนการติดตั้งโครงพื้นเหล็กกันสนิม ก่อนวางผนัง',
    images: [
      { src: '/photos/floor-frame.jpg', alt: 'โครงพื้นเหล็กบ้านน็อคดาวน์ ระหว่างติดตั้ง นครสวรรค์' },
      { src: '/photos/floor-frame-2.jpg', alt: 'โครงพื้นบ้านน็อคดาวน์ ขั้นตอนติดตั้ง อ.โกรกพระ' },
    ],
  },
  {
    title: 'ระหว่างติดตั้ง — ยกโครง',
    category: 'site',
    location: 'อ.พยุหะคีรี นครสวรรค์',
    description: 'ทีมงานกำลังยกโครงสร้างผนังและหลังคา',
    images: [
      { src: '/photos/frame-1.jpg', alt: 'ทีมงานยกโครงสร้างบ้านน็อคดาวน์หน้างาน นครสวรรค์' },
      { src: '/photos/frame-2.jpg', alt: 'โครงสร้างบ้านน็อคดาวน์ระหว่างสร้าง อ.พยุหะคีรี' },
    ],
  },
];
