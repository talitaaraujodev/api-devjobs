import crypto from 'crypto';
import multer from 'multer';
import path from 'path';

export default {
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve(__dirname, '..', '..', 'uploads'));
    },
    filename: (req, file, callback) => {
      const hash = crypto
        .createHash('sha256')
        .update(file.originalname)
        .digest('hex');
      const filename = `${hash}-${file.originalname}`;
      callback(null, filename);
    },
  }),
};
