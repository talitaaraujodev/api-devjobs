import { User } from '../../../application/domain/models/User';
import { UserModel } from '@prisma/client';
import { UserPersistenceOutputPort } from '../../../application/ports/output/UserOutputPort';
import { prisma } from '../../../config/database/prisma';

export class UserPersistenceAdapter implements UserPersistenceOutputPort {
  async save(user: User): Promise<User> {
    const userSaved = await prisma.userModel.create({
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

  async findById(id: string): Promise<UserModel | null> {
    const user = (await prisma.userModel.findUnique({
      where: { id },
      include: {
        Profile: true,
      },
    })) as UserModel | null;
    return user;
  }
  async findByEmail(email: string): Promise<User | null> {
    const user = (await prisma.userModel.findUnique({
      where: { email },
      include: {
        Profile: true,
      },
    })) as User | null;
    return user;
  }
  async findByCpf(cpf: string): Promise<User | null> {
    const user = (await prisma.userModel.findUnique({
      where: { cpf },
      include: {
        Profile: true,
      },
    })) as User | null;
    return user;
  }
}
