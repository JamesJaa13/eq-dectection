// src/telegram/telegram.module.ts
import { Module } from '@nestjs/common';
import { TelegramService } from './telegram.service';

@Module({
  providers: [TelegramService],
  exports: [TelegramService],  // เพื่อให้ที่อื่นเรียกใช้ได้
})
export class TelegramModule {}
