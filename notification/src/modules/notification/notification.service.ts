import { Injectable } from "@nestjs/common";
import { NotificationInterface } from "./interfaces/notification.interface";

@Injectable()
export class NotificationService {
  async sendOnEmail (data: NotificationInterface) {
    return data;
  }
}