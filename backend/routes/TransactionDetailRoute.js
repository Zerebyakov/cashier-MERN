import express from 'express'
import { 
    createTransactionDetail,
    getAllTransactionDetails, 
    getTransactionDetailsByTransactionId

} from '../controllers/TransactionDetailController.js';
import { verifyUser } from '../middleware/AuthUser.js';

const router = express.Router();

router.get('/transaction-details',verifyUser, getAllTransactionDetails);
router.get('/transaction-details/:transaction_id',verifyUser, getTransactionDetailsByTransactionId);
// router.get('/transaction-details', createTransactionDetail);


export default router