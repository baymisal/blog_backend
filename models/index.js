const myDB = require('../config/db');
const User = require('./UserModel');
const Blog = require('./BlogModel');
const Comment = require('./Comment');

// Blog User
User.hasMany(Blog, { foreignKey: 'authorId' });
Blog.belongsTo(User, { foreignKey: 'authorId', as: 'author' });

// Comment User
User.hasMany(Comment, { foreignKey: 'userId' });
Comment.belongsTo(User, { foreignKey: 'userId' });

// Comment Blog
Blog.hasMany(Comment, { foreignKey: 'blogId' });
Comment.belongsTo(Blog, { foreignKey: 'blogId' });

module.exports = { myDB, User, Blog, Comment };
