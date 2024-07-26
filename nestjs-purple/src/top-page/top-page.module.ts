import { Module } from '@nestjs/common';
import { TopPageController } from './top-page.controller';
import { ConfigService } from '@nestjs/config';
import { TypegooseModule } from 'nestjs-typegoose';
import { TopPageModel } from './top-page.model';
import { TopPageService } from './top-page.service';

@Module({
  controllers: [TopPageController],
  providers: [ConfigService, TopPageService],
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: TopPageModel,
        schemaOptions: {
          collection: 'TopPage',
        },
      },
    ]),
  ],
  exports: [TopPageService],
})
export class TopPageModule {}
