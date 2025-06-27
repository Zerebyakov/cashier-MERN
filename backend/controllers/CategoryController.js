import Category from "../models/Category.js";


export const getCategory = async (req, res) => {
    try {
        const response = await Category.findAll()
        res.status(200).json(response)
    } catch (error) {
        console.log(error.message)
    }
}
export const createCategory = async (req, res) => {
    try {
        await Category.create(req.body);
        res.status(201).json({ msg: 'Category created!!' })

    } catch (error) {
        console.log(error.message)
    }
}
export const deleteCategory = async (req, res) => {
    try {
        await Category.destroy({
            where: {
                id: req.params.id
            }
        })
        res.status(200).json({ msg: 'Category Deleted!!' })
    } catch (error) {
        console.log(error.message)
    }
}