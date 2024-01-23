import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = await app.get(ConfigService);
  const port = config.get<number>('API_PORT') || 3000;

  app.enableCors({
    credentials: true,
    origin: '*',
  });

  await app.listen(port, () => {
    console.log(`App started on port: ${port}`);
  });
}
bootstrap();
