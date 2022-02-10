import { JwtPayload } from 'jsonwebtoken';

export interface UserTokenInterface extends JwtPayload {
  id: number;
  firstName: string;
  password: string;
}
