import { AuthenticationService } from './authentication.service';
import {
  Controller,
  Inject,
  Body,
  Post
} from '@nestjs/common';
import { AuthorizationDto } from './dto/authorization.dto';

@Controller()
export class AuthenticationController {
  @Inject()
  authenticationService: AuthenticationService;

  @Post('login')
  async authorization(@Body() dto: AuthorizationDto) {
    return this.authenticationService.login(dto)
  }
}
