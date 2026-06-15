import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { SensorDataService } from './sensor-data.service';
import { SensorData } from './sensor-data.entity';

@Controller('sensor')
export class SensorDataController {
  constructor(private readonly sensorService: SensorDataService) {}

  @Post()
  async create(@Body() body: Partial<SensorData>): Promise<SensorData> {
    return this.sensorService.create(body);
  }
  

  @Get()
  async findAllOrRange(
    @Query('start') start?: string,
    @Query('end') end?: string,
  ): Promise<SensorData[]> {
    if (start && end) {
      const s = new Date(start);  // แปลง start ให้เป็น Date object
      const e = new Date(end);    // แปลง end ให้เป็น Date object

      // ปรับเวลา end ให้ครอบคลุมทั้งวัน (23:59:59)
      e.setHours(23, 59, 59, 999);

      // ส่งไปที่ service เพื่อดึงข้อมูลในช่วงเวลาที่ต้องการ
      const sensorData = await this.sensorService.findInRange(s, e);

      // แปลงเวลาของประเทศไทย (UTC+7) ก่อนส่งข้อมูลกลับ
      return sensorData.map(data => {
        data.timestamp = this.convertToThaiTimeZone(data.timestamp);
        return data;
      });
    }

    // ถ้าไม่มีการกำหนดช่วงเวลา ให้ดึงข้อมูลทั้งหมด
    const sensorData = await this.sensorService.findAll();

    // แปลงเวลาของประเทศไทย (UTC+7) ก่อนส่งข้อมูลกลับ
    return sensorData.map(data => {
      data.timestamp = this.convertToThaiTimeZone(data.timestamp);
      return data;
    });
  }

  private convertToThaiTimeZone(date: Date): Date {
    const dateObj = new Date(date);
    // คำนวณเวลา UTC+7 โดยไม่ต้องใช้ `toLocaleString`
    const timeOffset = 7 * 60; // UTC+7
    const utc = dateObj.getTime() + dateObj.getTimezoneOffset() * 60000;
    return new Date(utc + (timeOffset * 60000)); // ส่งคืน Date object ที่มีเวลา UTC+7
  }
}
