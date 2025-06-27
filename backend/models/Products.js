import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Category from "./Category.js";

const {DataTypes} = Sequelize;
const Products = db.define('products',{
    name:{
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    price:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    stock:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    category_id:{
        type: DataTypes.INTEGER
    }
},{
    freezeTableName: true,
});


Category.hasMany(Products, {foreignKey:'category_id'})
Products.belongsTo(Category, {foreignKey:'category_id'})

export default Products;


(async()=>{
    await db.sync();
})()