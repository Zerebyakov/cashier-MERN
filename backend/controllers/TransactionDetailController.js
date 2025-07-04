import TransactionDetails from "../models/TransactionDetails.js";
import Products from "../models/Products.js";
import Transactions from "../models/Transaction.js";




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

        const whereClause = {};

        // Filter berdasarkan tanggal transaksi
        if (startDate && endDate) {
            whereClause.createdAt = {
                [Op.between]: [new Date(startDate), new Date(endDate)]
            };
        }

        // Pencarian pada nama produk
        const productWhere = {};
        if (search) {
            productWhere.name = { [Op.like]: `%${search}%` };
        }

        const { count, rows } = await TransactionDetails.findAndCountAll({
            where: whereClause,
            include: [
                {
                    model: Products,
                    where: productWhere
                },
                {
                    model: Transactions
                }
            ],
            order: [[sort, order]],
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
