import { AuthenticationService } from './authentication.service';
import {
  Controller,
  Inject,
  HttpException,
  HttpStatus,
  Body,
  Req,
  Res
} from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices'
import { LoginData } from './interfaces/loginData.interface';

@Controller('authentication')
export class AuthenticationController {
  @Inject()
  authenticationService: AuthenticationService;

  @MessagePattern('administration.login')
  login( @Payload() loginData: LoginData ) {
    return this.authenticationService.authenticator(loginData)
  }
}
