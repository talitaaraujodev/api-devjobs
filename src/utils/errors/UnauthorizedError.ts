import { BaseError } from './BaseError';

export class UnauthorizedError extends BaseError {
  constructor(message: string, errors: any) {
    super(401, message, errors);
  }
}
