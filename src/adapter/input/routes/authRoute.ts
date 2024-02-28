import { container } from 'tsyringe';
import { Request, Response, Router } from 'express';
import { InjectionTokens } from '../../../utils/types/InjectionTokens';
import { UserPersistenceAdapter } from '../../output/persistense/UserPersistenceAdapter';
import { AuthService } from '../../../application/services/AuthService';
import { AuthController } from '../controllers/AuthController';

container.register(InjectionTokens.USER_PERSISTENCE_OUTPUT_PORT, {
  useClass: UserPersistenceAdapter,
});
container.register(InjectionTokens.AUTH_SERVICE_INPUT_PORT, {
  useClass: AuthService,
});
container.register(InjectionTokens.AUTH_CONTROLLER, {
  useClass: AuthController,
});

const authRoutes = Router();
const authController: AuthController = container.resolve('AuthController');

authRoutes.post('/auth', async (request: Request, response: Response) => {
  return await authController.auth(request, response);
});

export { authRoutes };
