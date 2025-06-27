import Transactions from "../models/Transaction.js";
import Product from '../models/Products.js';
import TransactionDetails from '../models/TransactionDetails.js';
import db from "../config/Database.js";


export const createTransaction = async (req, res) => {
    const {
        user_id,
        items,
        paid_amount
    } = req.body;

    const t = await db.transaction(); 
    try {
        let total_price = 0;
        const productMap = new Map();

        for (const item of items) {
            const product = await Product.findByPk(item.product_id, { transaction: t });
            if (!product || product.stock < item.quantity) {
                await t.rollback();
                return res.status(400).json({ error: `Stok tidak cukup untuk produk ID: ${item.product_id}` });
            }
            productMap.set(item.product_id, product);
            total_price += product.price * item.quantity;
        }

        const transaction = await Transactions.create({
            user_id,
            total_price,
            paid_amount,
            change_amount: paid_amount - total_price
        }, { transaction: t });

        for (const item of items) {
            const product = productMap.get(item.product_id);
            await TransactionDetails.create({
                transaction_id: transaction.id,
                product_id: item.product_id,
                quantity: item.quantity,
                price_each: product.price,
                subtotal: product.price * item.quantity
            }, { transaction: t });

            await product.update({ stock: product.stock - item.quantity }, { transaction: t });
        }

        await t.commit();
        res.status(201).json(transaction);

    } catch (error) {
        await t.rollback(); // rollback transaksi jika error
        console.error(error);
        res.status(500).json({ error: 'Gagal membuat transaksi' });
    }
}