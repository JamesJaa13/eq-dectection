import { Injectable, Logger } from '@nestjs/common';
import * as TelegramBot from 'node-telegram-bot-api'; // ✅ แก้ตรงนี้

@Injectable()
export class TelegramService {
  private readonly bot: TelegramBot;
  private readonly chatId: string;
  private readonly logger = new Logger(TelegramService.name);

  constructor() {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token) {
      throw new Error('Telegram Bot token is not set in environment variables.');
    }

    if (!chatId) {
      throw new Error('Telegram Chat ID is not set in environment variables.');
    }

    this.bot = new TelegramBot(token, { polling: false }); // ✅ ตรงนี้ใช้ได้
    this.chatId = chatId;
  }

  async sendMessage(message: string): Promise<void> {
    try {
      await this.bot.sendMessage(this.chatId, message);
      this.logger.log('✅ Telegram message sent');
    } catch (error) {
      this.logger.error('❌ Failed to send Telegram message', error);
    }
  }
}
