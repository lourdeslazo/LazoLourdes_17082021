'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.User.hasMany(models.Message);
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: 'Email address must be valid'
        },
        notEmpty: true,
      },
      unique: {
        msg: 'already exist',
      },
    },
    username: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [4,12],
          msg: 'Your username must contain 4 to 12 characters'
        },
        notEmpty: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      },
    },
    bio: DataTypes.STRING,
    profilPhoto: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};