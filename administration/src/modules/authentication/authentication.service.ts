import { HttpException, HttpStatus, Injectable, Inject } from '@nestjs/common';
import { UsersEntity } from '../user/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import bcrypt, { hash } from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import jwt from 'jsonwebtoken';
import { UserTokenInterface } from './interfaces/userToken.interface';
import { LoginData } from './interfaces/loginData.interface';
import { RegistrationData } from './interfaces/registrationData.interface';
import { Client, ClientKafka, Transport } from '@nestjs/microservices';

@Injectable()
export class AuthenticationService {
  @Client({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['localhost:9092'],
      },
      consumer: {
        groupId: 'administrationService',
      },
    },
  })
  private readonly client: ClientKafka;
  @Inject()
  configService: ConfigService;

  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
  ) {}

  newToken(payload: UserTokenInterface) {
    const jwtToken = jwt.sign(payload, this.configService.get('SECRET_KEY'));
    return jwtToken;
  }

  verifyToken(token: unknown): UserTokenInterface {
    try {
      return <UserTokenInterface>(
        jwt.verify(String(token), this.configService.get('SECRET_KEY'))
      );
    } catch (error) {
      throw new HttpException(
        'Code 403, token is invalid',
        HttpStatus.FORBIDDEN,
      );
    }
  }

  async authenticator(dto: LoginData) {
    const userExistence = await this.usersRepository.findOne({
      where: { login: dto.value.login },
    });

    if (!userExistence) {
      throw new HttpException('Wrong user\'s data', HttpStatus.UNAUTHORIZED);
    } else {
      const verifyPassword = bcrypt.compare(dto.value.password, userExistence.password);

      if (!verifyPassword) {
        throw new HttpException('Wrong user\'s data', HttpStatus.UNAUTHORIZED);
      } else {
        return {
          user: userExistence,
          authenticatedToken: this.newToken(userExistence),
        };
      }
    }
  }

  async registration(dto: RegistrationData) {
    const userExistence = await this.usersRepository.findOne({
      where: { login: dto.value.login },
    });

    if (userExistence) {
      return 'This user already exists'
    } else {
      dto.value.password = await hash(dto.value.password, 10);
      const newUser = await this.usersRepository.save(dto.value)
      this.client.send('administration.register', newUser);
      return {
        message: 'Registration complete',
        authenticatedToken: this.newToken(newUser)
      }
    }
  }
}
