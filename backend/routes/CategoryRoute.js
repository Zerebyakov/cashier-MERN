import express from 'express'
import { createCategory, deleteCategory, getCategory } from '../controllers/CategoryController.js';
import { verifyUser,adminOnly } from '../middleware/AuthUser.js';

const router = express.Router();

router.get('/category', getCategory)
router.post('/category', verifyUser,adminOnly,createCategory)
router.delete('/category/:id', verifyUser,adminOnly,deleteCategory)

export default router