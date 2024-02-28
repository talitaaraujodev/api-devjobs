import { Request, Response, Router } from 'express';
import { container } from 'tsyringe';
import multer from 'multer';
import { InjectionTokens } from '../../../utils/types/InjectionTokens';
import { ProfileService } from '../../../application/services/ProfileService';
import { ProfilePersistenceAdapter } from '../../output/persistense/ProfilePersistenceAdapter';
import { ProfileController } from '../controllers/ProfileController';
import uploadConfig from '../../../config/uploadConfig';
import { authMiddleware } from '../../../config/middlewares/authMiddleware';

container.register(InjectionTokens.PROFILE_PERSISTENCE_OUTPUT_PORT, {
  useClass: ProfilePersistenceAdapter,
});
container.register(InjectionTokens.PROFILE_SERVICE_INPUT_PORT, {
  useClass: ProfileService,
});
container.register(InjectionTokens.PROFILE_CONTROLLER, {
  useClass: ProfileController,
});

const profilesRoutes = Router();
const profileController: ProfileController =
  container.resolve('ProfileController');

const upload = multer(uploadConfig);

profilesRoutes.get(
  '/profiles/:id',
  authMiddleware,
  async (request: Request, response: Response) => {
    return await profileController.findOne(request, response);
  },
);
profilesRoutes.get(
  '/profiles/:userId',
  authMiddleware,
  async (request: Request, response: Response) => {
    return await profileController.findByUserId(request, response);
  },
);
profilesRoutes.get(
  '/profiles/download/:id',
  authMiddleware,
  async (request: Request, response: Response) => {
    return await profileController.downloadCurriculum(request, response);
  },
);

profilesRoutes.post(
  '/profiles',
  authMiddleware,
  upload.single('file'),
  async (request: Request, response: Response) => {
    return await profileController.create(request, response);
  },
);

export { profilesRoutes };
