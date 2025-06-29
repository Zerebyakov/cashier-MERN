import Users from "../models/Users.js";
import argon2 from 'argon2';

export const getUsers = async (req, res) => {
    try {
        const response = await Users.findAll();
        res.status(200).json(response)
    } catch (error) {
        console.log(error.message)
    }
}
export const getUsersById = async (req, res) => {
    try {
        const response = await Users.findOne({
            where: {
                uuid: req.params.id
            }
        })
        res.status(200).json(response)
    } catch (error) {
        console.log(error.message)
    }
}
export const createUsers = async (req, res) => {
    const { name, email, password, confPassword, role } = req.body;
    if (password !== confPassword) return res.status(400).json({ msg: 'Password dan Confirm Password Tidak Sama' })
    const hashPassword = await argon2.hash(password)
    try {
        await Users.create({
            name: name,
            email: email,
            password: hashPassword,
            role: role
        })
        res.status(201).json({ msg: 'User Created!!' })
    } catch (error) {
        console.log(error.message)
    }
}
export const updateUsers = async (req, res) => {
    const user = await Users.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if (!user) return res.status(404).json({ msg: 'User not found !' })
    const { name, email, password, confPassword, role } = req.body;
    let hashPassword;
    if (password === '' || password === null) {
        hashPassword = user.password
    } else {
        hashPassword = await argon2.hash(password)
    }
    if (password !== confPassword) return res.status(400).json({ msg: 'Password and Confirm Password doesnt match !' })
    try {
        await Users.update({
            name: name,
            email: email,
            password: hashPassword,
            role: role
        },{
            where:{
                id: user.id
            }
        })
        res.status(200).json({ msg: 'User Updated!!' })
    } catch (error) {
        console.log(error.message)
    }

}


export const deleteUser = async (req, res) => {
    try {
        await Users.destroy({
            where: {
                id: req.params.id
            }
        })
        res.status(200).json({ msg: 'User Deleted!!' })
    } catch (error) {
        console.log(error.message)
    }
}