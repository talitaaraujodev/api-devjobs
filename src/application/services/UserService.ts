import { inject, injectable } from 'tsyringe';
import { v4 as uuid } from 'uuid';
import { UserServiceInputPort } from '../ports/input/UserServiceInputPort';
import { InjectionTokens } from '../../utils/types/InjectionTokens';
import { UserPersistenceOutputPort } from '../ports/output/UserOutputPort';
import { User } from '../domain/models/User';
import { NotFoundError } from '../../utils/errors/NotFoundError';
import { UserYupValidator } from '../../utils/validators/UserValidator';
import { BadRequestError } from '../../utils/errors/BadRequestError';
import { OutputFindOneUserDto } from '../dto/UserDto';

@injectable()
export class UserService implements UserServiceInputPort {
  constructor(
    @inject(InjectionTokens.USER_PERSISTENCE_OUTPUT_PORT)
    private readonly userPersistence: UserPersistenceOutputPort,
  ) {}
  async create(user: User): Promise<User> {
    const userValidate = UserYupValidator.validate(user);
    if (userValidate?.errors) {
      throw new BadRequestError('BadRequestError', userValidate.errors);
    }
    const emailExists = await this.userPersistence.findByEmail(user.email);
    if (emailExists) {
      throw new BadRequestError('BadRequestError', [
        'Usuário já existente por e-mail.',
      ]);
    }
    const cpfExists = await this.userPersistence.findByCpf(user.cpf);
    if (cpfExists) {
      throw new BadRequestError('BadRequestError', [
        'Usuário já existente por CPF.',
      ]);
    }
    const userCreated = new User(
      uuid(),
      user.name,
      user.email,
      user.cpf,
      user.password,
    );
    await userCreated.encryptPassword();
    const userSaved = await this.userPersistence.save(userCreated);

    return {
      id: userSaved.id,
      name: userSaved.name,
      email: userSaved.email,
      cpf: userSaved.cpf,
    } as User;
  }
  async findOne(id: string): Promise<OutputFindOneUserDto> {
    const user: any = await this.userPersistence.findById(id);
    let result = {
      id: user.id,
      name: user.name,
      email: user.email,
      cpf: user.cpf,
      profile: !user.Profile
        ? {}
        : {
            id: user.Profile.id,
            birthDate: user.Profile.birthDate,
            phone: user.Profile.phone,
            cep: user.Profile.cep,
            logradouro: user.Profile.logradouro,
            number: user.Profile.number,
            bairro: user.Profile.bairro,
            statusCivil: user.Profile.statusCivil,
            cv: user.Profile.curriculumOriginalname,
          },
    };

    if (!user) {
      throw new NotFoundError('Usuário não encontrado por id');
    }
    return result;
  }
}
