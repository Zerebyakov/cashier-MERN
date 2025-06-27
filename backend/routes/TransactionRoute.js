import express from 'express'
import { createTransaction } from '../controllers/TransactionController.js';
import { verifyUser } from '../middleware/AuthUser.js';


const router = express.Router();

router.post('/transactions',verifyUser, createTransaction)


export default router