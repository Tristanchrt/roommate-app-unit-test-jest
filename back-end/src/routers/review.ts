import express from 'express';
import { create, find, findByUser } from '../controllers/review';
import { getFromToken } from '../controllers/user';

const router: express.Router = express.Router();

router.post('/', getFromToken, create);
router.get('/:id', findByUser);
router.get('/', find);

export { router as routerReview };
