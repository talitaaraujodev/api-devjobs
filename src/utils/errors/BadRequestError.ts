import { BaseError } from './BaseError';

export class BadRequestError extends BaseError {
  constructor(message: string, errors: any) {
    super(400, message, errors);
  }
}
