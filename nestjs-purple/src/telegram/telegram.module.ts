import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { ITelegramAsyncOptions } from './telegram.interface';
import { TELEGRAM_MODULE_OPTIONS } from './telegram.constants';

@Global()
@Module({})
export class TelegramModule {
  static forRootAsync(options: ITelegramAsyncOptions): DynamicModule {
    const asyncOptions = this.createAsyncOptionsProvider(options);
    return {
      module: TelegramModule,
      imports: options.imports,
      providers: [TelegramService, asyncOptions],
      exports: [TelegramService],
    };
  }

  private static createAsyncOptionsProvider(
    options: ITelegramAsyncOptions,
  ): Provider {
    return {
      provide: TELEGRAM_MODULE_OPTIONS,
      async useFactory(...args) {
        const config = await options.useFactory();
        return config;
      },
      inject: options.inject || [],
    };
  }
}
