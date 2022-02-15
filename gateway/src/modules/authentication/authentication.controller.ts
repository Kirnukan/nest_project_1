import { AuthenticationService } from './authentication.service';
import {
  Controller,
  Inject,
  Body,
  Post
} from '@nestjs/common';
import { AuthorizationDto } from './dto/authorization.dto';
import { RegistrationDto } from './dto/registration.dto';

@Controller()
export class AuthenticationController {
  @Inject()
  authenticationService: AuthenticationService;

  @Post('login')
  async authorization(@Body() dto: AuthorizationDto) {
    return this.authenticationService.login(dto)
  }

  @Post('register')
  async registration(@Body() dto: RegistrationDto) {
    return this.authenticationService.register(dto)
  }
}
