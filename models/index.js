const myDB = require('../config/db');
const User = require('./UserModel');
const Blog = require('./BlogModel');
const Comment = require('./Comment');

// Associations
User.hasMany(Comment, { foreignKey: 'userId' });
Comment.belongsTo(User, { foreignKey: 'userId' });

Blog.hasMany(Comment, { foreignKey: 'blogId' });
Comment.belongsTo(Blog, { foreignKey: 'blogId' });

module.exports = { myDB, User, Blog, Comment };



// const Sequelize = require('sequelize');
// const myDB = require('../config/db');

// // Import individual models
// const RoleBlog = require('./RoleModel');
// const User = require('./UserModel'); 
// const Blog = require('./BlogModel');
// const Comment = require('./Comment');

// // Define associations here (if any)
// // Example: User.hasMany(Blog); Blog.belongsTo(User); etc.

// // Export all models + Sequelize instance
// module.exports = {
//   myDB,
//   RoleBlog,
//   User,
//   Blog,
//   Comment
// };
