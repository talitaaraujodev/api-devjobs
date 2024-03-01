import jwt from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import { compareSync } from 'bcrypt';
import { BadRequestError } from '../../utils/errors/BadRequestError';
import { InjectionTokens } from '../../utils/types/InjectionTokens';
import { AuthServiceInputPort } from '../ports/input/AuthServiceInputPort';
import { UserPersistenceOutputPort } from '../ports/output/UserOutputPort';
import { AuthYupValidator } from '../../utils/validators/AuthValidator';
import envConfig from '../../config/envConfig';
import { OutputAuthDto } from '../dto/AuthDto';

@injectable()
export class AuthService implements AuthServiceInputPort {
  constructor(
    @inject(InjectionTokens.USER_PERSISTENCE_OUTPUT_PORT)
    private readonly userPersistence: UserPersistenceOutputPort,
  ) {}

  async auth(email: string, password: string): Promise<OutputAuthDto> {
    const authValidate = AuthYupValidator.validate(email, password);
    if (authValidate?.errors) {
      throw new BadRequestError('BadRequestError', authValidate.errors);
    }

    const user: any = await this.userPersistence.findByEmail(email);
    if (user) {
      const isPasswordValid = compareSync(password, user.password);
      if (!isPasswordValid) {
        throw new BadRequestError('BadRequestError', [
          'Email ou senha inválidos.',
        ]);
      }
      const token = jwt.sign(
        { sub: user.id, email: user.email, name: user.name },
        envConfig.jwtSecret,
        {
          expiresIn: envConfig.jwtExpire,
        },
      ) as string;

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

      return {
        user: result,
        token: token,
      };
    }
    throw new BadRequestError('BadRequestError', [
      'Email e/o senha inválidos.',
    ]);
  }
}
