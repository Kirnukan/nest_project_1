import { IsPhoneNumber, Length } from 'class-validator';

export class RegistrationDto {
  @Length(2, 32)
  login: string;

  @Length(8, 64)
  password: string;

  @IsPhoneNumber()
  phone: string;

  @Length(1, 32)
  firstName: string;

  @Length(1, 32)
  lastName: string;

  @Length(1, 32)
  middleName: string;
}