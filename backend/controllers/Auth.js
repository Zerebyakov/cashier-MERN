import Users from "../models/Users.js";
import argon2 from 'argon2'


export const Login = async (req, res) => {
    const user = await Users.findOne({
        where: {
            email: req.body.email
        }
    });

    if (!user) {
        return res.status(404).json({ msg: 'User Not Found !!' })
    }
    const match = await argon2.verify(user.password, req.body.password);
    if (!match) {
        return res.status(400).json({ msg: 'Wrong Password !' })
    }
    req.session.user_id = user.uuid;
    const uuid = user.uuid;
    const name = user.name;
    const email = user.email;
    const role = user.role;
    
    res.status(200).json({ uuid, name, email, role })
}


export const Me = async (req, res) => {
    if (!req.session.user_id) {
        return res.status(401).json({ msg: 'Please login to your account' })
    }
    const user = await Users.findOne({
        attributes:['uuid','name','email','role'],
        where: {
            uuid: req.session.user_id
        }
    });

    if (!user) {
        return res.status(404).json({ msg: 'User Not Found !!' })
    }
    res.status(200).json(user)
}

export const logOut = (req, res) => {
    req.session.destroy((err) => {
        if (err) return res.status(400).json({ msg: 'Cannot Logout !' })
        res.status(200).json({ msg: 'logout Succesfully !' })
    })
}