import { CivilStatus } from '@prisma/client';

export class Profile {
  constructor(
    private _id: string,
    private _birthDate: Date,
    private _phone: string,
    private _cep: string,
    private _logradouro: string,
    private _number: string,
    private _bairro: string,
    private _statusCivil: CivilStatus,
    private _curriculumOriginalname: string,
    private _curriculumFilename: string,
    private _userId: string,
  ) {}
  get id(): string {
    return this._id;
  }
  get birthDate(): Date {
    return this._birthDate;
  }
  get phone(): string {
    return this._phone;
  }
  get cep(): string {
    return this._cep;
  }
  get logradouro(): string {
    return this._logradouro;
  }
  get number(): string {
    return this._number;
  }
  get bairro(): string {
    return this._bairro;
  }
  get statusCivil(): CivilStatus {
    return this._statusCivil;
  }
  get curriculumOriginalname(): string {
    return this._curriculumOriginalname;
  }
  get curriculumFilename(): string {
    return this._curriculumFilename;
  }
  get userId(): string {
    return this._userId;
  }
}
