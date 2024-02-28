import { User } from '../../../application/domain/models/User';
import { UserPersistenceOutputPort } from '../../../application/ports/output/UserOutputPort';
import { prisma } from '../../../config/database/prisma';

export class UserPersistenceAdapter implements UserPersistenceOutputPort {
  async save(user: User): Promise<User> {
    const userSaved = await prisma.user.create({
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        cpf: user.cpf,
        password: user.password,
      },
    });
    return new User(
      userSaved.id,
      userSaved.name,
      userSaved.email,
      userSaved.cpf,
      userSaved.password,
    );
  }

  async findById(id: string): Promise<User | null> {
    const user = (await prisma.user.findUnique({
      where: { id },
    })) as User | null;
    return user;
  }
  async findByEmail(email: string): Promise<User | null> {
    const user = (await prisma.user.findUnique({
      where: { email },
    })) as User | null;
    return user;
  }
  async findByCpf(cpf: string): Promise<User | null> {
    const user = (await prisma.user.findUnique({
      where: { cpf },
    })) as User | null;
    return user;
  }
}
