import * as yup from 'yup';
import { Profile } from '../../application/domain/models/Profile';

export class ProfileYupValidator {
  static validate(profile: Profile) {
    try {
      yup
        .object()
        .shape({
          birthDate: yup
            .string()
            .required('Data de nascimento é um campo obrigatório.'),
          phone: yup.string().required('Telefone é um campo obrigatório'),
          cep: yup.string().required('CEP é um campo obrigatório'),
          logradouro: yup
            .string()
            .required('Logradouro é um campo obrigatório'),
          number: yup.string().required('Número é um campo obrigatório'),
          bairro: yup.string().required('Bairro é um campo obrigatório'),
          statusCivil: yup
            .string()
            .required('Status civil é um campo obrigatório'),
          curriculumOriginalname: yup
            .string()
            .required('Currículo é um campo obrigatório'),
          curriculumFilename: yup
            .string()
            .required('Currículo é um campo obrigatório'),
          userId: yup.string().required('userId é um campo obrigatório'),
        })
        .validateSync(
          {
            birthDate: profile.birthDate,
            phone: profile.phone,
            cep: profile.cep,
            logradouro: profile.logradouro,
            number: profile.number,
            bairro: profile.bairro,
            statusCivil: profile.statusCivil,
            curriculumOriginalname: profile.curriculumOriginalname,
            curriculumFilename: profile.curriculumFilename,
            userId: profile.userId,
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
