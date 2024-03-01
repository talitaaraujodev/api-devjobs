import { NotFoundError } from '../../../utils/errors/NotFoundError';
import { User } from '../../domain/models/User';
import { OutputFindOneUserDto } from '../../dto/UserDto';

export interface UserServiceInputPort {
  create(user: User): Promise<User>;
  findOne(id: string): Promise<OutputFindOneUserDto | NotFoundError>;
}
