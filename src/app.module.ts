import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { RankModule } from './rank/rank.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true,envFilePath: '.env' }),
    RankModule,
    DatabaseModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
