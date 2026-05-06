export type ModelCategory = 'small' | '1br' | '2br' | 'commercial';

export interface HouseModel {
  slug: string;
  title: string;
  category: ModelCategory;
  sizeRange: string;
  startingPriceTHB: number;
  suitableFor: string;
  features: string[];
  images: string[]; // paths starting with /photos/
}

export const models: HouseModel[] = [
  {
    slug: 'baan-small-8-10',
    title: 'บ้านขนาดเล็ก 8–10 ตร.ม.',
    category: 'small',
    sizeRange: '8–10 ตร.ม.',
    startingPriceTHB: 39000,
    suitableFor: 'อยู่คนเดียว / บ้านพักชั่วคราว / ห้องเก็บของ',
    features: ['โครงสร้างเหล็กกันสนิม', 'ผนัง PU/EPS กันความร้อน', 'ติดตั้ง 7–15 วัน'],
    images: ['/photos/small-8-10-rainbow.jpg', '/photos/green-house.jpg'],
  },
  {
    slug: 'baan-1-bedroom',
    title: 'บ้าน 1 ห้องนอน 1 ห้องน้ำ 12–30 ตร.ม.',
    category: '1br',
    sizeRange: '12–30 ตร.ม.',
    startingPriceTHB: 101500,
    suitableFor: 'บ้านพักอาศัยขนาดเล็ก / คู่รักเริ่มต้น',
    features: ['1 ห้องนอน 1 ห้องน้ำ', 'มีระเบียงด้านหน้า', 'พร้อมระบบไฟฟ้า'],
    images: ['/photos/blue-house-1br.jpg', '/photos/orange-day.jpg'],
  },
  {
    slug: 'baan-2-bedroom',
    title: 'บ้าน 2 ห้องนอน 1 ห้องน้ำ 30–50 ตร.ม.',
    category: '2br',
    sizeRange: '30–50 ตร.ม.',
    startingPriceTHB: 250000,
    suitableFor: 'ครอบครัว / บ้านหลังที่สอง',
    features: ['2 ห้องนอน 1 ห้องน้ำ', 'ห้องครัว + ห้องนั่งเล่น', 'ปรับแบบได้'],
    images: ['/photos/blue-finished.jpg', '/photos/interior-1.jpg'],
  },
  {
    slug: 'baan-resort-cafe',
    title: 'บ้านรีสอร์ท / ร้านค้า / คาเฟ่',
    category: 'commercial',
    sizeRange: 'ตามแบบ',
    startingPriceTHB: 150000,
    suitableFor: 'ธุรกิจปล่อยเช่า / ร้านค้า / คาเฟ่',
    features: ['ดีไซน์ทันสมัย', 'ปรับเลย์เอาต์ได้', 'พร้อมระบบเชิงพาณิชย์'],
    images: ['/photos/orange-house-cafe.jpg', '/photos/orange-night.jpg'],
  },
];
