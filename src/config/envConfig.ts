import * as dotenv from 'dotenv';
dotenv.config();

export = {
  serverPort: Number(process.env.PORT) || 4003,
  jwtExpire: process.env.JWT_EXPIREIN || '15m',
  jwtSecret: process.env.JWT_SECRET || 'secret',
};
