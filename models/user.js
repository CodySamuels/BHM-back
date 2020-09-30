// DEPENDENCIES AND VARIABLES
// ===============================================
const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");


// MODEL
// ===============================================
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define("user", {


    // TABLE COLUMNS
    // ===============================================
    userId: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      isEmail: true
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
      is: /^[0-9a-f]{64$/i,
      validate: {
        len: [6]
      }
    },

    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zip: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
  },


    // TABLE NAME
    // ===============================================
    {
      tableName: "user"
    })


  // ASSOCIATIONS
  // ===============================================
  user.associate = (models) => {
    user.hasOne(models.cart, { onDelete: "cascade" });
  };


  // HASH AND SALT THE USER'S PASSWORD
  // ===============================================
  user.beforeCreate((user) => { user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null) })


  // RETURN
  // ===============================================
  return user;
}
