import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { SensorData } from './sensor-data.entity';
import { TelegramService } from './telegram/telegram.service';  // import TelegramService

@Injectable()
export class SensorDataService {
  constructor(
    @InjectRepository(SensorData)
    private sensorRepo: Repository<SensorData>,
    private telegramService: TelegramService,  // inject TelegramService
  ) {}

  async create(data: Partial<SensorData>): Promise<SensorData> {
    const rec = this.sensorRepo.create(data);
    const saved = await this.sensorRepo.save(rec);

    // ถ้า vibrationDetected เป็น true ส่งแจ้งเตือน Telegram
    if (saved.vibrationDetected) {
      await this.telegramService.sendMessage(
        `⚠️ แจ้งเตือน! มีแผ่นดินไหวตรวจพบ`
      );
    }

    return saved;
  }

  async findAll(): Promise<SensorData[]> {
    return this.sensorRepo.find({
      order: { timestamp: 'ASC' },
    });
  }

  async findInRange(start: Date, end: Date): Promise<SensorData[]> {
    return this.sensorRepo.find({
      where: {
        timestamp: Between(start, end),
      },
      order: {
        timestamp: 'ASC',
      },
    });
  }
}
