import { Module } from '@nestjs/common';
import { HhService } from './hh.service';
import { TopPageService } from 'src/top-page/top-page.service';
import { TopPageModule } from 'src/top-page/top-page.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

@Module({
  providers: [HhService],
  imports: [TopPageModule, ConfigModule, HttpModule],
})
export class HhModule {}
