const { DataTypes } = require('sequelize');
const myDB = require('../config/db');

const Blog = myDB.define('blog', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  timestamps: true,
  freezeTableName: true,
});

module.exports = Blog;


