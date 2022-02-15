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
import { RegistrationData } from './interfaces/registrationData.interface';

@Controller('authentication')
export class AuthenticationController {
  @Inject()
  authenticationService: AuthenticationService;

  @MessagePattern('administration.login')
  async login( @Payload() loginData: LoginData ) {
    return this.authenticationService.authenticator(loginData)
  }
  @MessagePattern('administration.register')
  async register( @Payload() registrationData: RegistrationData ) {
    return this.authenticationService.registration(registrationData)
  }
}
