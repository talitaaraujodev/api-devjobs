import { Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';
import { InjectionTokens } from '../../../utils/types/InjectionTokens';
import { BaseError } from '../../../utils/errors/BaseError';
import { AuthServiceInputPort } from '../../../application/ports/input/AuthServiceInputPort';

@injectable()
export class AuthController {
  constructor(
    @inject(InjectionTokens.AUTH_SERVICE_INPUT_PORT)
    private authServiceInputPort: AuthServiceInputPort,
  ) {}

  async auth(request: Request, response: Response): Promise<Response> {
    try {
      const { email, password } = request.body;
      return response
        .json(await this.authServiceInputPort.auth(email, password))
        .status(200);
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
