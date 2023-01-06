import express from 'express';
import * as MessageCtrl from '../controllers/message';
import { checkIdentity } from '../controllers/user';
import multer from 'multer';
const router: express.Router = express.Router();

router.post('/create', MessageCtrl.create);
router.post('/uploadFile', MessageCtrl.uploadFile);
router.get('/file/:id/:fileName', MessageCtrl.findFileMessage);
router.get('/all', MessageCtrl.findAll);

export { router as routerMessage };
