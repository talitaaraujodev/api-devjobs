import { UserModel } from '@prisma/client';
import { User } from '../../domain/models/User';

export interface UserPersistenceOutputPort {
  save(user: User): Promise<User>;
  findById(id: string): Promise<UserModel | null>;
  findByEmail(email: string): Promise<User | null>;
  findByCpf(cpf: string): Promise<User | null>;
}
