import express from 'express';
import {getProductById, getProducts, deleteProduct, createProduct, updateProduct, createProductReview, getTopProducts} from '../controllers/productController.js'
import {protect, admin} from '../../middleWare/authMiddleWare.js'


const router = express.Router();

router.get('/top', getTopProducts);
router.route('/').get(getProducts).post(protect, admin, createProduct);
router.route('/:id').get(getProductById).delete(protect, admin, deleteProduct ).put(protect,admin,updateProduct);
router.route('/:id/reviews').post(protect, createProductReview)





export default router;