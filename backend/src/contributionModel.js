const { DataTypes } = require('sequelize');
const { sequelize } = require('./db');

const Contribution = sequelize.define("Contribution", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    tip: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    totalAmount: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    anonymous: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING
    },
    orderId: {
        type: DataTypes.STRING
    },
    status: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'pending'
    }
}, { timestamps: true });

module.exports = Contribution;