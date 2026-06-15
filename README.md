# eq-dectection
Project ระบบการจำลองการสั่นไหวของแผ่นดินไหว
# 🌍 Seismic Event Simulation & Detection System

ระบบเว็บแอปพลิเคชันสำหรับ **จำลองการสั่นสะเทือนของแผ่นดินไหว** และเฝ้าระวังเหตุการณ์แบบ Real-time พัฒนาด้วยสถาปัตยกรรม Full-Stack  เพื่อใช้ในการศึกษา วิเคราะห์ และทดสอบการแจ้งเตือนเมื่อเกิดคลื่นความสั่นสะเทือนในระดับที่กำหนด โดยแยกส่วนประกอบของ Frontend และ Backend ออกจากกันอย่างชัดเจน พร้อมระบบแจ้งเตือนอัตโนมัติผ่าน Telegram

## ✨ Key Features (ความสามารถหลักของระบบ)

* **📊 Seismic Simulation & Monitoring:** ระบบจำลองและประมวลผลข้อมูลคลื่นความสั่นสะเทือนของแผ่นดินไหว เพื่อแสดงผลการจำลองสถานการณ์แบบ Real-time
* **🔍 Search & History:** ค้นหาและดูประวัติข้อมูลการจำลองแผ่นดินไหว โดยสามารถกำหนดช่วงวันที่เริ่มต้นและสิ้นสุดเพื่อเรียกดูข้อมูลย้อนหลังได้
* **🔔 Real-time Telegram Alerts:** ระบบส่งข้อความแจ้งเตือนอัตโนมัติผ่าน Telegram Bot ทันทีที่ค่าการสั่นสะเทือนในระบบจำลองแตะถึงเกณฑ์ความเสี่ยงที่กำหนดไว้
* **🐳 Dockerized Environment:** จัดการสภาพแวดล้อมของฐานข้อมูลและระบบด้วย Docker เพื่อให้ง่ายต่อการ Deploy, ทดสอบ และ Scale ระบบ

## 🛠️ Tech Stack (เทคโนโลยีที่ใช้)

**Frontend:**
* Framework: [Next.js](https://nextjs.org/) (React)
* Language: TypeScript
* Styling: Tailwind CSS

**Backend:**
* Framework: [NestJS](https://nestjs.com/) (Node.js)
* Language: TypeScript
* Database: PhpMyAdmin
* Integration: Telegram Bot API (สำหรับการแจ้งเตือน), External APIs (สำหรับดึงข้อมูลอ้างอิงการจำลอง)

**Infrastructure / DevOps:**
* Containerization: Docker & Docker Compose
* Version Control: Git & GitHub

## 🚀 Getting Started (การติดตั้งและเริ่มต้นใช้งาน)

### Prerequisites (สิ่งที่ต้องมีในเครื่อง)
ก่อนเริ่มต้น โปรดตรวจสอบให้แน่ใจว่าคุณได้ติดตั้งเครื่องมือเหล่านี้แล้ว:
* [Node.js](https://nodejs.org/) (v18 หรือใหม่กว่า)
* [Docker Desktop](https://www.docker.com/products/docker-desktop)
* Telegram Account (สำหรับการสร้าง Bot Token)

2. Backend Setup (ระบบหลังบ้าน)
เข้าไปที่โฟลเดอร์ backend และทำการติดตั้ง Dependencies
cd backend
npm install

ตั้งค่า Environment Variables (.env):
สร้างไฟล์ .env ในโฟลเดอร์ backend และกำหนดค่าดังนี้:
PORT=3000
DATABASE_URL="mysql://root:password@localhost:3306/seismic_db"
TELEGRAM_BOT_TOKEN="your_telegram_bot_token"
TELEGRAM_CHAT_ID="your_telegram_chat_id"

รัน Database ด้วย Docker:
docker-compose up -d

เริ่มต้นการทำงานของ Backend:
npm run start:dev

3. Frontend Setup (ระบบหน้าบ้าน)
เปิด Terminal ใหม่ เข้าไปที่โฟลเดอร์ frontend และติดตั้ง Dependencies
cd ../frontend
npm install

ตั้งค่า Environment Variables (.env):
สร้างไฟล์ .env ในโฟลเดอร์ frontend และกำหนดค่าดังนี้:
NEXT_PUBLIC_API_URL=http://localhost:3000

เริ่มต้นการทำงานของ Frontend:
npm run dev

📱 Usage (การใช้งานเบื้องต้น)
เปิดเบราว์เซอร์และเข้าไปที่ http://localhost:3001
ที่หน้า Dashboard คุณสามารถเริ่มต้น ระบบจำลองการสั่นสะเทือน หรือเลือกกำหนด "วันที่เริ่มต้น" และ "วันที่สิ้นสุด" เพื่อค้นหาประวัติการจำลองย้อนหลัง
ระบบจะทำการประมวลผลค่าการสั่นสะเทือนจำลอง หากกราฟหรือค่าความรุนแรงถึงเกณฑ์ที่ตั้งค่าไว้ Backend จะทำการยิง Trigger
ตรวจสอบแอปพลิเคชัน Telegram ของคุณ ระบบจะส่งข้อความแจ้งเตือนระดับความรุนแรงของแผ่นดินไหวจำลองเข้ามาแบบ Real-time

<img width="811" height="722" alt="image" src="https://github.com/user-attachments/assets/8addecff-8b26-470f-b711-b0aa37520334" />

