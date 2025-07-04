import express from 'express'
import { 
    createTransactionDetail,
    getAllTransactionDetails, 
    getTransactionDetailsByTransactionId,
    getTransactionSummary

} from '../controllers/TransactionDetailController.js';
import { verifyUser } from '../middleware/AuthUser.js';

const router = express.Router();

router.get('/transaction-details',verifyUser, getAllTransactionDetails);
router.get('/transaction-details/:transaction_id',verifyUser, getTransactionDetailsByTransactionId);
// router.get('/transaction-details', createTransactionDetail);
router.get('/transactions-summary',verifyUser, getTransactionSummary);


export default router