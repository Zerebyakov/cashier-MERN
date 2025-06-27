import express from 'express'
import { createProduct, deleteProduct, getProductById, getProducts, updateProduct } from '../controllers/ProductController.js';
import { verifyUser, adminOnly } from '../middleware/AuthUser.js';


const router = express.Router();
router.get('/products',verifyUser, getProducts)
router.post('/products',verifyUser, adminOnly,createProduct)
router.get('/products/:id',verifyUser, getProductById)
router.patch('/products/:id',verifyUser,adminOnly, updateProduct)
router.delete('/products/:id',verifyUser,adminOnly, deleteProduct)


export default router