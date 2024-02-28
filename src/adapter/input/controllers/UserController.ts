import { Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';
import { UserServiceInputPort } from '../../../application/ports/input/UserServiceInputPort';
import { InjectionTokens } from '../../../utils/types/InjectionTokens';
import { BaseError } from '../../../utils/errors/BaseError';

@injectable()
export class UserController {
  constructor(
    @inject(InjectionTokens.USER_SERVICE_INPUT_PORT)
    private userServiceInputPort: UserServiceInputPort,
  ) {}
  async create(request: Request, response: Response): Promise<Response> {
    try {
      const user = await this.userServiceInputPort.create(request.body);
      return response
        .json({
          message: 'Usuário criado com sucesso',
          user,
        })
        .status(201);
    } catch (e) {
      if (e instanceof BaseError) {
        return response
          .status(e.code)
          .json({ message: e.message, status: e.code, errors: e.errors });
      }
      return response.json(e).status(500);
    }
  }
  async findOne(request: Request, response: Response): Promise<Response> {
    try {
      const id = request.params.id;
      const user = await this.userServiceInputPort.findOne(id);
      return response.json(user).status(200);
    } catch (e) {
      if (e instanceof BaseError) {
        return response
          .status(e.code)
          .json({ message: e.message, code: e.code, errors: e.errors });
      }
      return response.json(e).status(500);
    }
  }
}
