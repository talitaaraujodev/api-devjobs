import 'reflect-metadata';
import app from './App';
import { usersRoutes } from '../../adapter/input/routes/usersRoute';
import { profilesRoutes } from '../../adapter/input/routes/profilesRoute';
import { authRoutes } from '../../adapter/input/routes/authRoute';
import envConfig from '../../config/envConfig';

app.listen(envConfig.serverPort, [usersRoutes, profilesRoutes, authRoutes]);
