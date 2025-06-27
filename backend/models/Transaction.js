import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./Users.js";



const {DataTypes} = Sequelize;
const Transactions = db.define('transaction',{
    user_id:{
        type: DataTypes.INTEGER,
    },
    total_price:{
        type: DataTypes.INTEGER
    },
    paid_amount:{
        type: DataTypes.INTEGER
    },
    change_amount:{
        type: DataTypes.INTEGER
    }
},{
    freezeTableName: true
})

Users.hasMany(Transactions, {foreignKey:'user_id'})
Transactions.belongsTo(Users, {foreignKey:'user_id'})

export default Transactions;

(async()=>{
    await db.sync();
})()


// total_price : total Harga transaksi
// paid_amount : Uang yang di bayar
// change_amount : uang kembalian