import { Module } from '@nestjs/common';
import { ProvidersModule } from 'libs/providers/src';

@Module({
  imports: [ProvidersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
