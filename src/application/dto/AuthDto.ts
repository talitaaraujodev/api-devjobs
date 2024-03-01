export interface OutputAuthDto {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    cpf: string;
    profile: {
          id: string;
          birthDate: Date;
          phone: string;
          cep: string;
          logradouro: string;
          number: string;
          bairro: string;
          statusCivil: string;
          cv: string;
        }
      | {};
  };
}
