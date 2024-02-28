import { User } from '../../application/domain/models/User';
import * as yup from 'yup';

export class UserYupValidator {
  static validate(user: User) {
    try {
      yup
        .object()
        .shape({
          name: yup.string().required('O nome é obrigatório.'),
          email: yup
            .string()
            .email('E-mail com formato inválido.')
            .required('E-mail é um campo obrigatório.'),
          cpf: yup
            .string()
            .required('CPF um campo obrigatório.')
            .max(11, 'O CPF dever ter no máximo 11 caracteres '),
          password: yup
            .string()
            .min(6, 'A senha deve ter pelo menos 6 caracteres.')
            .required('Senha é um campo obrigatório.'),
        })
        .validateSync(
          {
            name: user.name,
            email: user.email,
            cpf: user.cpf,
            password: user.password,
          },
          {
            abortEarly: false,
          },
        );
    } catch (err) {
      const error = err as yup.ValidationError;
      return { errors: error.errors };
    }
  }
}
