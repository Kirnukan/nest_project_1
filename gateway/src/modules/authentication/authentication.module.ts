import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { Module } from '@nestjs/common';

@Module({
  controllers: [AuthenticationController],
  providers: [AuthenticationService],
  exports: [AuthenticationService],
})
export class AuthenticationModule {}
