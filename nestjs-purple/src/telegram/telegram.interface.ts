import { ModuleMetadata } from '@nestjs/common';

export interface ITelegramOptions {
  chat_id: string;
  token: string;
}

export interface ITelegramAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  useFactory: (...args: any[]) => Promise<ITelegramOptions> | ITelegramOptions;
  inject?: any[];
}
