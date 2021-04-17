import express from 'express'
const router = express.Router();
import {protect, admin} from '../middleware/authMiddleware.js'
import {getProductById, getProducts, deleteProductById, updateProduct, createProduct, productReview} from '../controllers/productController.js'
// GET ALL PRODUCTS GET(/api/products)
router.route('/').get(getProducts).post(protect, admin, createProduct)

router.route('/:id/reviews').post(protect, productReview)
// GET PRODUCT BY ID GET(/api/products/:id)
router.route('/:id').get(getProductById).delete(protect, admin, deleteProductById).put(protect, admin, updateProduct)



export default router