import { ConfigService } from '@nestjs/config';
import { Ctx, Message, On, Start, Update } from 'nestjs-telegraf';
import { ChatgptService } from 'src/chatgpt/chatgpt.service';
import { Context, Scenes, Telegraf } from 'telegraf';

@Update()
export class TelegramService extends Telegraf<Scenes.SceneContext> {
  constructor(
    private readonly configService: ConfigService,
    private readonly chatGptService: ChatgptService,
  ) {
    super(configService.get('TELEGRAM_API'));
  }

  @Start()
  onStart(@Ctx() ctx: Context) {
    ctx.replyWithHTML(`
      <b>Привет ${ctx.from.username}</b>
      Это чат бот с ChatGpt!
      Введите любую фразу и получите ответ!
    `);
  }

  @On('text')
  onMessage(@Message('text') message: string) {
    return this.chatGptService.generateResponse(message);
  }
}
