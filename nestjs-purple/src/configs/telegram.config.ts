import { ConfigService } from '@nestjs/config';
import { TypegooseModuleOptions } from 'nestjs-typegoose';
import { ITelegramOptions } from 'src/telegram/telegram.interface';

export const getTelegramConfig = (
  configService: ConfigService,
): ITelegramOptions => {
  const token = configService.get('TELEGRAM_BOT_TOKEN');

  if (!token) {
    throw new Error('TELEGRAM_BOT_TOKEN не задан');
  }

  return { token, chat_id: configService.get('CHAT_ID') ?? '' };
};
