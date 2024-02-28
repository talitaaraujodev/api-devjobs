import * as bcrypt from 'bcrypt';

export class User {
  constructor(
    private _id: string,
    private _name: string,
    private _email: string,
    private _cpf: string,
    private _password: string,
  ) {}

  get id(): string {
    return this._id;
  }
  get name(): string {
    return this._name;
  }
  get email(): string {
    return this._email;
  }
  get cpf(): string {
    return this._cpf;
  }
  get password(): string {
    return this._password;
  }
  async encryptPassword(): Promise<string> {
    const hashPassword: string = await bcrypt.hash(this._password, 10);
    this._password = hashPassword;
    return this._password;
  }
}
