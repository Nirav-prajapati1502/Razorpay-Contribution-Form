const { Sequelize } = require('sequelize');

const sequelize = new Sequelize("contribution", "root", "1502", {
    host: "localhost",
    port: 3306,
    dialect: "mysql"
})

sequelize.authenticate().then(() => {
    console.log("Db Connected!")
}).catch((err) => {
    console.log("Db Connection Failed:", err)
});

sequelize.sync({ force: false }).then(() => {
    console.log("Database synced successfully");
}).catch((err) => {
    console.log(err);
});

module.exports = {
    sequelize
}