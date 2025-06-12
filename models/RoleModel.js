const { DataTypes } = require('sequelize');
const myDB = require('../config/db');

const RoleBlog = myDB.define('RoleBlog', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    roleName: {
        type: DataTypes.ENUM('Admin', 'Author', 'Guest'),
        allowNull: false,
        unique: true
    }
}, {
    tableName: 'role_blogs',
    timestamps: true,
    freezeTableName: true
});

   
module.exports = RoleBlog;
