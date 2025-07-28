const { Sequelize } = require('sequelize');

const sequelize = new Sequelize("contribution", "admin", "admin0987", {
    host: "coolairtech.cncwy8ws07sd.ap-south-1.rds.amazonaws.com",
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