import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Transactions from "./Transaction.js";
import Products from "./Products.js";



const {DataTypes} = Sequelize;
const TransactionDetails = db.define('transaction_details',{
    transaction_id:{
        type:DataTypes.INTEGER
    },
    product_id:{
        type: DataTypes.INTEGER
    },
    quantity:{
        type: DataTypes.INTEGER
    },
    price_each:{
        type: DataTypes.INTEGER
    },
    subtotal:{
        type: DataTypes.INTEGER
    },

},{
    freezeTableName: true
})

Transactions.hasMany(TransactionDetails, {foreignKey:'transaction_id'})
TransactionDetails.belongsTo(Transactions, {foreignKey:'transaction_id'})



Products.hasMany(TransactionDetails, {foreignKey:'product_id'})
TransactionDetails.belongsTo(Products, {foreignKey:'product_id'})




export default TransactionDetails;

(async()=>{
    await db.sync();
})()


// price_each : Harga satuan saat transaksi
// subtotal : quantity × price_each