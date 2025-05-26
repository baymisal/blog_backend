const { DataTypes } = require('sequelize');
const myDB = require('../config/db');
const RoleBlog = require('./RoleModel');
const bcrypt = require('bcryptjs');

const User = myDB.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  roleId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: RoleBlog,
      key: 'id'
    }
  }
}, {
  tableName: 'users',
  timestamps: true,
  freezeTableName: true
});

User.beforeCreate(async (user) => {
  user.password = await bcrypt.hash(user.password, 10);
});

RoleBlog.hasMany(User, { foreignKey: 'roleId' });
User.belongsTo(RoleBlog, { foreignKey: 'roleId' });

module.exports = User;
