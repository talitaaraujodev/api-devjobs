import { NotFoundError } from '../../../utils/errors/NotFoundError';
import { User } from '../../domain/models/User';

export interface UserServiceInputPort {
  create(user: User): Promise<User>;
  findOne(id: string): Promise<User | NotFoundError>;
}
