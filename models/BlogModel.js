const { DataTypes } = require('sequelize');
const myDB = require('../config/db');
const User = require('./UserModel');

const Blog = myDB.define('Blog', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  authorId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('Draft', 'Published'),
    allowNull: false,
    defaultValue: 'Published'
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  timestamps: false
});

Blog.belongsTo(User, { foreignKey: 'authorId', as: 'author' });
User.hasMany(Blog, { foreignKey: 'authorId' });

module.exports = Blog;





// const { DataTypes } = require('sequelize')
// const User = require('./UserModel'); // Import the User model
// const myDB = require('../config/db')
// require('dotenv').config()


// const Blog = myDB.define('blog',{
//     id:{
//        type:DataTypes.INTEGER,
//        autoIncrement:true,
//        primaryKey:true
//     },
//     title:{
//        type:DataTypes.STRING,
//        allowNull:false
//     },
//     content:{
//        type:DataTypes.TEXT,
//        allowNull:false
//     },
//     authorId:{
//        type:DataTypes.INTEGER,
//        allowNull:false
//     },
//     status:{
//        type:DataTypes.ENUM('Draft', 'Published'),
//        allowNull:false,
//        defaultValue:'Published'
//     },
//     createdAt:{
//        type:DataTypes.DATE,
//        defaultValue:DataTypes.NOW
//     },
// })

// Blog.belongsTo(User, { foreignKey: 'authorId', as: 'author' });
// User.hasMany(Blog, { foreignKey: 'authorId' });
// module.exports = Blog;

//(ID, title, content, author, status, creation date).