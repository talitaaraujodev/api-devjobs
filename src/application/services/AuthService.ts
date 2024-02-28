import jwt from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import { compareSync } from 'bcrypt';
import { BadRequestError } from '../../utils/errors/BadRequestError';
import { InjectionTokens } from '../../utils/types/InjectionTokens';
import { AuthServiceInputPort } from '../ports/input/AuthServiceInputPort';
import { UserPersistenceOutputPort } from '../ports/output/UserOutputPort';
import { AuthYupValidator } from '../../utils/validators/AuthValidator';
import envConfig from '../../config/envConfig';

@injectable()
export class AuthService implements AuthServiceInputPort {
  constructor(
    @inject(InjectionTokens.USER_PERSISTENCE_OUTPUT_PORT)
    private readonly userPersistence: UserPersistenceOutputPort,
  ) {}

  async auth(email: string, password: string): Promise<string> {
    const authValidate = AuthYupValidator.validate(email, password);
    if (authValidate?.errors) {
      throw new BadRequestError('BadRequestError', authValidate.errors);
    }

    const user = await this.userPersistence.findByEmail(email);
    if (user) {
      const isPasswordValid = compareSync(password, user.password);
      if (!isPasswordValid) {
        throw new BadRequestError('BadRequestError', {
          error: 'Email e/o senha inválidos.',
        });
      }
      return jwt.sign(
        { sub: user.id, email: user.email, name: user.name },
        envConfig.jwtSecret,
        {
          expiresIn: envConfig.jwtExpire,
        },
      ) as string;
    }
    throw new BadRequestError('BadRequestError', {
      error: 'Email e/o senha inválidos.',
    });
  }
}
