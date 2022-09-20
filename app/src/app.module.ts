import { Module } from '@nestjs/common';
import { ApiModule } from './api/api.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbconfig } from './config/db.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(dbconfig),
    ApiModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
