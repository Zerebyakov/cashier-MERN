import db from "../config/Database.js";
import { Sequelize } from "sequelize";

const {DataTypes} = Sequelize;
const Users = db.define('users',{
    uuid:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    name:{
        type:DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            len: [3,100]
        }
    },
    email:{
        type:DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            isEmail: true
        }
    },
    password:{
        type:DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    role:{
        type: DataTypes.ENUM([
            'admin',
            'cashier'
        ])
    },
},{
    freezeTableName: true,
    timestamps:false,
    updatedAt: false,
    createdAt: false
})

export default Users;

(async()=>{
    await db.sync();
})()