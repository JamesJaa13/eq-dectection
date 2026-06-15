import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    turbo: {}, // ใช้ object ว่างถ้าไม่มีการตั้งค่าเพิ่ม
  },
};

export default nextConfig;
