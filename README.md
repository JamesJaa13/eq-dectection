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
* Database: Mysql (PhpMyAdmin)
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
* Arduino IDE

<img width="811" height="722" alt="image" src="https://github.com/user-attachments/assets/8addecff-8b26-470f-b711-b0aa37520334" />

