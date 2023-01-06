import express from 'express';
import * as filterCtrl from '../controllers/filter';
import * as UserCtrl from '../controllers/user';

const router: express.Router = express.Router();

router.put('/', UserCtrl.checkIdentity, UserCtrl.getFromToken, filterCtrl.update);

export { router as routerFilter };
