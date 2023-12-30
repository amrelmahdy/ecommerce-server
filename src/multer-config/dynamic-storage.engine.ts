// dynamic-storage.engine.ts
import { diskStorage } from 'multer';

export const DynamicStorageEngine = (destinationCallback: Function) => {
  return diskStorage({
    destination: (req, file, cb) => {
        console.log("here")
      const destination = destinationCallback(req, file);
      cb(null, destination);
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });
};