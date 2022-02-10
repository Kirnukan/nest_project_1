import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class ParamsIdGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    if (!isNaN(request.params.id) || request.params.id > 0) {
      return true;
    }
    throw new HttpException('Have not id', HttpStatus.BAD_REQUEST);
  }
}