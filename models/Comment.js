const {DataTypes} = require('sequelize');
const myDB = require("../config/db");


  const Comment = myDB.define('Comment', {
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    blogId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
 module.exports = Comment;

//   const {DataTypes} = require('sequelize');
//   const myDB = require ('../config/db')

//   const Comment = myDB.define('Comment', {
//     text: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//   });

//   Comment.associate = (models) => {
//     Comment.belongsTo(models.User, { foreignKey: 'userId' });
//     Comment.belongsTo(models.Blog, { foreignKey: 'blogId' });
//   };



// module.exports = Comment;