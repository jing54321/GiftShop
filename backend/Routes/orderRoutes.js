import express from 'express';
import {addOrderItems} from '../controllers/orderController.js'
import { protect } from '../../middleWare/authMiddleWare.js';

const router = express.Router();

router.route('/').post(protect, addOrderItems);

export default router;