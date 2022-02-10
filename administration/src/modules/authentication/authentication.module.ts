import { UsersEntity } from '../user/user.entity';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity]), ConfigService],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, ConfigService],
})
export class AuthenticationModule {}
