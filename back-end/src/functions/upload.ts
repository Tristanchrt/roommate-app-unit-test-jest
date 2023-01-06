import multer from 'multer';
import fs from 'fs';

export const STORAGE_PROFILE_PICTURE = (userId: string): string => `./src/storage/users/${userId}/`;
export const STORAGE_MESSAGE_FILE = `./src/storage/messages`;
export const UPLOADED_FILE_NAME = (fileName: string): string => fileName.replace(/[/\\?%*:|"<>]/g, '-') + '.file';

export const createFolderIfDoesntExist = (path: string): void => {
  const arrayFolder = path.split('/');
  let folder = '';
  arrayFolder.forEach((folderName) => {
    folder += `${folderName}/`;
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder);
    }
  });
};

export const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, callback) {
      const path = './src/storage/temp';
      createFolderIfDoesntExist(path);
      callback(null, path);
    },
    filename: function (req, file, callback) {
      callback(null, `${UPLOADED_FILE_NAME(file.originalname)}`);
    },
  }),
}).any();

export const moveFile = (filePath: string, newPath: string, callback: any): void => {
  const folderPath = newPath.substr(0,newPath.lastIndexOf("/"));
  createFolderIfDoesntExist(folderPath);
  fs.rename(filePath, newPath, (error) => {
    callback(error);
  });
};
