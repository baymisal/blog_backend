const { DataTypes } = require('sequelize');
const myDB = require('../config/db');

const Comment = myDB.define('Comment', {
  text: {
    type: DataTypes.STRING,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  blogId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  timestamps: true
});

module.exports = Comment;




// const {DataTypes} = require('sequelize');
// const myDB = require("../config/db");


//   const Comment = myDB.define('Comment', {
//     text: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     userId: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//     blogId: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//   });
//  module.exports = Comment;
