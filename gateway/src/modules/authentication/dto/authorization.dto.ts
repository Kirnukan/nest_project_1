import { Length } from 'class-validator';

export class AuthorizationDto {
  @Length(2, 32)
  login: string;

  @Length(8, 64)
  password: string;
}
