import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/common/entity/authuser.entity';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
  ],
  controllers: [ApiController],
  providers: [ApiService]
})
export class ApiModule {}
