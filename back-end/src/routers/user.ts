import express from 'express';
import * as UserCtrl from '../controllers/user';

const router: express.Router = express.Router();

router.put('/avatar', UserCtrl.checkIdentity, UserCtrl.updateAvatar);
router.post('/connect', UserCtrl.connect);
router.post('/signup', UserCtrl.create);
router.put('/:id', UserCtrl.checkIdentity, UserCtrl.update);
router.delete('/:id', UserCtrl.checkIdentity, UserCtrl.deleteOne);
router.get('/me', UserCtrl.findMe);
router.get('/conversations', UserCtrl.conversations);
router.get('/:id', UserCtrl.findOne);
router.get('/avatar/:idUser/:fileName', UserCtrl.findAvatar);
router.get('/', UserCtrl.findAll);

export { router as routerUser };
