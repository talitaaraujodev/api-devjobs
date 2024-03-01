import { OutputAuthDto } from '../../dto/AuthDto';

export interface AuthServiceInputPort {
  auth(email: string, password: string): Promise<OutputAuthDto>;
}
