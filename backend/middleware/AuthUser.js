import Users from "../models/Users.js";


export const verifyUser = async (req, res, next) => {
    if (!req.session.user_id) {
        return res.status(401).json({ msg: 'Please login to your account' })
    }
    const user = await Users.findOne({
        where: {
            uuid: req.session.user_id
        }
    });

    if (!user) {
        return res.status(404).json({ msg: 'User Not Found !!' })
    }
    req.user_id = user.id;
    req.role = user.role;
    next();
}
export const adminOnly = async (req, res, next) => {
    const user = await Users.findOne({
        where: {
            uuid: req.session.user_id
        }
    });

    if (!user) {
        return res.status(404).json({ msg: 'User Not Found !!' })
    }
    if(user.role !== "admin") return res.status(403).json({ msg: 'Prohibited Access !!' })
    next();
}

