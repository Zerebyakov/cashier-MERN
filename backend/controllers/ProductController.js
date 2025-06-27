import { Op } from "sequelize";
import Products from "../models/Products.js";
import Category from "../models/Category.js";


export const getProducts = async (req, res) => {
    const {
        page = 1,
        limit = 10,
        order = 'asc',
        search = '',
        sort = 'id'
    } = req.query;

    const offset = (page - 1) * limit;
    try {
        const { count, rows } = await Products.findAndCountAll({
            where: {
                name: { [Op.like]: `%${search}%` }
            },
            order: [[sort, order]],
            limit: parseInt(limit),
            offset: parseInt(offset),
            include:[
                {
                    model: Category,
                    attributes:['id','name']
                }
            ]
        });

        res.json({
            totalItems : count,
            totalPages : Math.ceil(count/limit),
            currentPage : parseInt(page),
            data: rows
        })
    } catch (error) {
        console.log(error.message)

    }

}
export const getProductById = async (req, res) => {
    try {
        const response = await Products.findOne({
            where: {
                id: req.params.id
            }
        })
        res.status(200).json(response)
    } catch (error) {
        console.log(error.message)
    }
}
export const createProduct = async (req, res) => {
    try {
        await Products.create(req.body)
        res.status(201).json({ msg: 'Product Created !!' })
    } catch (error) {
        console.log(error.message)
    }
}
export const updateProduct = async (req, res) => {
    try {
        await Products.update(req.body, {
            where: {
                id: req.params.id
            }
        })
        res.status(200).json({ msg: 'Product Updated !!' })
    } catch (error) {
        console.log(error.message)
    }
}
export const deleteProduct = async (req, res) => {
    try {
        await Products.destroy({
            where: {
                id: req.params.id
            }
        })
        res.status(200).json({ msg: 'Product Deleted !!' })
    } catch (error) {
        console.log(error.message)
    }
}