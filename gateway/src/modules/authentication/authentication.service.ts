import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, Transport, ClientKafka } from '@nestjs/microservices';
import { AuthorizationDto } from './dto/authorization.dto';


@Injectable()
export class AuthenticationService implements OnModuleInit {
  @Client({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['localhost:9092']
      },
      consumer: {
        groupId: 'gateway'
      }
    }
  })
  client: ClientKafka

  async onModuleInit() {
    this.client.subscribeToResponseOf('administration.login')
    await this.client.connect();
  }

  async login(dto: AuthorizationDto) {
    return this.client.send('administration.login', dto)
  }
}
