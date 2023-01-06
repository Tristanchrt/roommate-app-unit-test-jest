import express from 'express';
import * as convCtrl from '../controllers/conversation';
import * as UserCtrl from '../controllers/user';
const router: express.Router = express.Router();

router.post('/', UserCtrl.checkIdentity, UserCtrl.getFromToken, convCtrl.createConv);
router.get('/:id', convCtrl.findOne);
router.delete('/:id', convCtrl.deleteOne);
router.put('/:id', convCtrl.addMessage);
router.put('/addToConversation/:id', convCtrl.addToConversation);
router.put('/addMessage/:id', convCtrl.addMessage);

export { router as routerConversation };
