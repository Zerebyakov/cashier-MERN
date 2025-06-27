import TransactionDetails from "../models/TransactionDetails.js";
import Products from "../models/Products.js";
import Transactions from "../models/Transaction.js";



export const getAllTransactionDetails = async (req, res) => {
    try {
        const details = await TransactionDetails.findAll({
            include: [
                { model: Products },
                { model: Transactions }
            ]
        });
        res.status(200).json(details);
    } catch (err) {
        res.status(500).json({ error: 'Gagal mengambil data detail transaksi' });
    }
};


export const getTransactionDetailsByTransactionId = async (req, res) => {
    const { transaction_id } = req.params;
    try {
        const details = await TransactionDetails.findAll({
            where: { transaction_id },
            include: [{ model: Products }]
        });

        if (!details || details.length === 0) {
            return res.status(404).json({ message: 'Detail transaksi tidak ditemukan' });
        }

        res.status(200).json(details);
    } catch (err) {
        res.status(500).json({ error: 'Gagal mengambil detail transaksi' });
    }
};

export const createTransactionDetail = async (req, res) => {
    const { transaction_id, product_id, quantity, price_each } = req.body;

    try {
        const subtotal = quantity * price_each;
        const detail = await TransactionDetails.create({
            transaction_id,
            product_id,
            quantity,
            price_each,
            subtotal
        });

        res.status(201).json(detail);
    } catch (err) {
        res.status(500).json({ error: 'Gagal menambahkan detail transaksi' });
    }
};
