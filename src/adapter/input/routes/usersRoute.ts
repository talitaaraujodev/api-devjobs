import { container } from 'tsyringe';
import { Request, Response, Router } from 'express';
import { InjectionTokens } from '../../../utils/types/InjectionTokens';
import { UserService } from '../../../application/services/UserService';
import { UserPersistenceAdapter } from '../../output/persistense/UserPersistenceAdapter';
import { UserController } from '../controllers/UserController';
import { authMiddleware } from '../../../config/middlewares/authMiddleware';

container.register(InjectionTokens.USER_PERSISTENCE_OUTPUT_PORT, {
  useClass: UserPersistenceAdapter,
});
container.register(InjectionTokens.USER_SERVICE_INPUT_PORT, {
  useClass: UserService,
});
container.register(InjectionTokens.USER_CONTROLLER, {
  useClass: UserController,
});

const usersRoutes = Router();
const userController: UserController = container.resolve('UserController');

usersRoutes.get(
  '/users/:id',
  authMiddleware,
  async (request: Request, response: Response) => {
    return await userController.findOne(request, response);
  },
);

usersRoutes.post('/users', async (request: Request, response: Response) => {
  return await userController.create(request, response);
});

export { usersRoutes };
