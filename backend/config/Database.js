import { Sequelize } from "sequelize";

const db = new Sequelize('kasirasik', 'root', '', {
    host: "localhost",
    dialect: 'mysql'
});


// Export instance dengan nama 'sequelize'
export { db };
export default db;