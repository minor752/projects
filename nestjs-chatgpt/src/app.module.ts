import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ChatgptModule } from './chatgpt/chatgpt.module';
import { TelegramModule } from './telegram/telegram.module';
import { TelegramService } from './telegram/telegram.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ChatgptModule,
    TelegramModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
