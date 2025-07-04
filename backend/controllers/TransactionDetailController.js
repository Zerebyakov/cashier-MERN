import TransactionDetails from "../models/TransactionDetails.js";
import Products from "../models/Products.js";
import Transactions from "../models/Transaction.js";
import { Op, Sequelize } from "sequelize";



export const getAllTransactionDetails = async (req, res) => {
    try {
        const {
            page = 1,
            limit = 10,
            sort = 'createdAt',
            order = 'desc',
            search = '',
            startDate,
            endDate
        } = req.query;

        const offset = (page - 1) * limit;

        // Buat filter untuk tanggal transaksi
        const transactionWhere = {};
        if (startDate && endDate) {
            transactionWhere.createdAt = {
                [Op.between]: [new Date(startDate), new Date(endDate)]
            };
        }

        // Buat filter pencarian nama produk
        const productWhere = {};
        if (search) {
            productWhere.name = {
                [Op.like]: `%${search}%`
            };
        }

        // Dapatkan semua data transaksi yang sesuai filter (pagination + count)
        const { count, rows } = await TransactionDetails.findAndCountAll({
            where: {}, // kosong karena filter di dalam include
            include: [
                {
                    model: Products,
                    where: productWhere,
                    required: false
                },
                {
                    model: Transactions,
                    where: transactionWhere,
                    required: true
                }
            ],
            order: [[Sequelize.col(sort), order]], // aman untuk sort relasi
            limit: parseInt(limit),
            offset: parseInt(offset)
        });

        res.status(200).json({
            totalData: count,
            totalPages: Math.ceil(count / limit),
            currentPage: parseInt(page),
            data: rows
        });
    } catch (err) {
        console.error(err);
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


// GET /transactions-summary
export const getTransactionSummary = async (req, res) => {
    try {
        const {
            page = 1,
            limit = 10,
            sort = 'createdAt',
            order = 'desc',
            startDate,
            endDate
        } = req.query;

        const offset = (page - 1) * limit;

        const transactionWhere = {};
        if (startDate && endDate) {
            transactionWhere.createdAt = {
                [Op.between]: [new Date(startDate), new Date(endDate)]
            };
        }
        const { count, rows } = await Transactions.findAndCountAll({
            where: transactionWhere,
            include: [
                {
                    model: TransactionDetails,
                    include: [Products]
                }
            ],
            distinct: true, // ✅ ini penting untuk hitung transaksi unik
            order: [[sort, order]],
            limit: parseInt(limit),
            offset: parseInt(offset)
        });


        const mappedData = rows.map((transaction) => {
            const totalItems = transaction.transaction_details.reduce((sum, item) => sum + item.quantity, 0);
            return {
                id: transaction.id,
                createdAt: transaction.createdAt,
                total_price: transaction.total_price,
                totalItems
            };
        });

        res.status(200).json({
            totalData: count,
            totalPages: Math.ceil(count / limit),
            currentPage: parseInt(page),
            data: mappedData
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Gagal mengambil ringkasan transaksi' });
    }
};
