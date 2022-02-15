
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { NotificationService } from './notification.service';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @MessagePattern('administration.register')
  notificationSend(@Payload() data) {
    return this.notificationService.sendOnEmail(data)
  }
}