import * as yup from 'yup';

export class AuthYupValidator {
  static validate(email: string, password: string) {
    try {
      yup
        .object()
        .shape({
          email: yup
            .string()
            .required('E-mail é um campo obrigatório')
            .email('E-mail com formato inválido'),
          password: yup
            .string()
            .required('Senha é um campo obrigatório')
            .min(6, 'Senha deve ter pelo menos 6 caracteres'),
        })
        .validateSync(
          {
            email,
            password,
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
